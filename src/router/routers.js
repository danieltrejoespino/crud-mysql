const express = require('express')
const router=express.Router()

const {home} = require('../controller/controller')
const {actions_mysql} = require('../controller/controller_mysql')

// router.use((req, res, next) => {
//   console.log('Solicitud recibida:', req.method, req.url, req.body);
//   next();
// });

router.post('/get-token',home.createToken);
  
// router.post('/test', home.testToken)
router.get('/test', home.testToken)

// router.get('/test-token', home.verifyToken, home.testToken);


// mysql routes
router.get('/test-mysql', actions_mysql.conn)
router.get('/get_users', actions_mysql.check_user)

router.post('/insert-leads',home.verifyToken, actions_mysql.insert_leads)




// Manejar excepciones
router.use((req, res, next) => {
  res.status(404).json({"msg": "Ruta no encontrada"});
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({"msg": "Error interno"});
});


module.exports = router



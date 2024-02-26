const express = require('express')
const router=express.Router()

const {home} = require('../controller/controller')
const {actions_mysql} = require('../controller/controller_mysql')

 

router.post('/get-token',home.createToken);
  
router.get('/test', home.test)

router.get('/test-token', home.verifyToken, home.testToken);


// mysql routes
router.get('/test-mysql', actions_mysql.conn)
router.get('/get_users', actions_mysql.check_user)

router.post('/insert-leads',home.verifyToken, actions_mysql.conn)




// Manejar exepciones
router.use((req, res, next) => {
  res.status(404).json('La ruta solicitada no se encuentra.');
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json('Se produjo un error en el servidor.');
});


module.exports = router



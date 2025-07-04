const express = require('express')
const router=express.Router()
const bodyParser = require('body-parser')

const {home} = require('../controller/controller')
const {actions_mysql} = require('../controller/controller_mysql')

router.use(bodyParser.json())

// router.use((req, res, next) => {
//   console.log('----------------------------');
//   console.log(`DEV => Tipo: ${req.method} Ruta: ${req.url} IP: ${req.ip}`);
//   console.log(req.body);
//   console.log('----------------------------');
//   next();
// });

router.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
      console.log('Respuesta enviada:', body);
      return originalJson.call(this, body);
  };
  next();
});


router.post('/test', home.test)
 

router.post('/get-token',home.createToken);
  

router.post('/test-token', home.verifyToken, home.testToken);


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



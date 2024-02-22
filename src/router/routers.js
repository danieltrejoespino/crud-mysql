const express = require('express')
const router=express.Router()

const {home} = require('../controller/controller')
const {actions} = require('../controller/controller_mysql')

 


router.post('/get-token',home.createToken);
  
router.get('/test', home.test)

router.get('/test-token', home.verifyToken, home.testToken);

router.get('/test-mysql', actions.conn)


module.exports = router
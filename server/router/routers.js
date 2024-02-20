const express = require('express')
const router=express.Router()

const {home} = require('../controller/controller')

 


router.post('/get-token',home.createToken);
  
router.get('/test', home.test)

router.get('/test-token', home.verifyToken, home.testToken);

module.exports = router
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
router.get('/valida_user', actions_mysql.validateUser)


module.exports = router



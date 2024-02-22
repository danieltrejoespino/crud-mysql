const pool = require('../config/db_mysql')

const testConn = {
  probarConexion: function(callback) {
    pool.query('SELECT 1', callback);
  } 
}

const User = {
  consultaUsuario : () =>{
       pool.query('SELECT * FROM usuarios', callback);
  }
}


module.exports = {
  testConn,User
}
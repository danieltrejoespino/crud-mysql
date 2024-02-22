 const {testConn,User} = require('../models/login_mysql')

const actions = {
  conn : (req,res) =>{    
    testConn.probarConexion ((error) => {
      if (error) {
        console.error("Error conectando a la base de datos:", error);
        return res.status(500).json({ error: 'Error de conexión a la base de datos' });
      }
      else{
        console.log('conectado');
        res.json('conectado')
      }
    })
  }

} 
   

module.exports = {actions}

  // {
  //   "name":"Daniel",
  //   "correo":"Daniel.gmal"
  // }

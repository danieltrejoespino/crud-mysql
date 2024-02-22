 const {testConn,User} = require('../models/login_mysql')

const actions = {
  conn : async (req,res) =>{        
    try {      
      await testConn.validarConexion();      
      res.json('conectado');
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }
}


   

module.exports = {actions}

  // {
  //   "name":"Daniel",
  //   "correo":"Daniel.gmal"
  // }

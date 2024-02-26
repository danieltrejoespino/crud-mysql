 const {testConn,User} = require('../models/login_mysql')

const actions_mysql = {
  conn : async (req,res) =>{        
    try {      
      await testConn.validarConexion();      
      res.json('conectado');
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json(error);
    }
  },
  check_user : async (req,res) => {
    try {
      const data =await User.obtenerTodos()
      console.log(data)
      res.json(data)
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json(error);      
    }
  },
  validateUser : async(name,pass)=>{
    try {            
      const usuarioValido = await User.validarUsuario(name, pass);            
      return usuarioValido;      
    } catch (error) {
        console.error("Error en el controlador mysql:", error);
        return error
    }
  }

}


   

module.exports = {actions_mysql}

  // {
  //   "name":"Daniel",
  //   "correo":"Daniel.gmal"
  // }



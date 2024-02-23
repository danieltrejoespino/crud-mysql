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
  validateUser : async(req,res)=>{
    try {
      // const { usuario, password } = req.body; // Asumiendo que los datos vienen del cuerpo de la petición
      const usuario='DANIEL'
      const password = 1234
      const usuarioValido = await User.validarUsuario(usuario, password);
      
      if (usuarioValido) {
          res.json({ mensaje: 'Usuario válido' });
      } else {
          res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
      }
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json({ error: 'Error al validar el usuario' });
    }
  }

}


   

module.exports = {actions_mysql}

  // {
  //   "name":"Daniel",
  //   "correo":"Daniel.gmal"
  // }



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
  get_skey : async () => {
    try {
      const data =await User.obtenerSk()
      return data      
    } catch (error) {
      return error
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
  },
  insert_leads : async(req,res)=>{
    // console.log(req.body);
    const FECHA_LEADS = req.body.FECHA_LEADS
    const NOMBRES = req.body.NOMBRES
    try {            
      const usuarioValido = await User.insertLeads(req.body);            
      
      console.log('-------',usuarioValido);  
      if (usuarioValido) {
        res.json('datos insertados')  
      }    
      else{
        res.status(402).json('Error al insertar datos')
      }

      

    } catch (error) {
        console.error("Error en el controlador mysql:", error);
        res.status(500).json('ocurrio un error al insertar los datos')

    }
  }

}


   

module.exports = {actions_mysql}

 

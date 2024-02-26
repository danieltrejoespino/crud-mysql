const jwt = require('jsonwebtoken');

const {actions_mysql} = require('../controller/controller_mysql')

const secretKey = 'danieljosuetrejo';


const home = {
  test : (req,res) =>{
    res.json('prueba')
  },
  
  testToken : (req,res) =>{
    res.json('con exito')
  },
  createToken : async (req,res) =>{
    const name = req.body.name
    const pass = req.body.pass
    console.log(name.toUpperCase());
    if (!name || !pass) {
      console.log('Faltan datos');
      return res.status(403).json(`Verifica que envies usuario y pass`);
    }

    let resp = await actions_mysql.validateUser(name,pass)
    console.log('----',resp);
    if (resp) {      
      const usuario = {      
        nombre: name,
        pass: pass
      }      
      const tiempoExpiracion = 8 * 60 * 60
      const token = jwt.sign({ usuario }, secretKey, { expiresIn: tiempoExpiracion })
    
      res.json(token);
    } else {
      res.status(500).json('Usuario o pass invalidos')
    }


  },
  verifyToken : (req, res, next) => {  
    const bearerHeader = req.headers['authorization'];  
    if (typeof bearerHeader !== 'undefined') {    
      const bearer = bearerHeader.split(' ');      
      const bearerToken = bearer[1];      
      try {
        const decoded = jwt.verify(bearerToken, secretKey);
        req.user = decoded;
        next(); 
      } catch (error) {
        return res.status(401).send({ message: 'Token inválido' });
      }
    } else {    
      return res.status(403).send({ message: 'Se requiere un token para autenticación' });
    }
  }
}

module.exports = {home}

  // {
  //   "name":"Daniel",
  //   "correo":"Daniel.gmal"
  // }

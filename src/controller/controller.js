const jwt = require('jsonwebtoken');

const secretKey = 'danieljosuetrejo';


const home = {
  test : (req,res) =>{
    res.json('prueba')
  },
  
  testToken : (req,res) =>{
    res.json('con exito')
  },
  createToken : (req,res) =>{

    const name = req.body.name
    const correo = req.body.correo
    console.log(name);
    if (!name || !correo) {
      console.log('Faltan datos');
      return res.status(403).json(`Faltan credenciales`);

    }
    
    const usuario = {
      id: 1,
      nombre: name,
      correo: correo
    };  
    
    const tiempoExpiracion = 8 * 60 * 60;
    const token = jwt.sign({ usuario }, secretKey, { expiresIn: tiempoExpiracion });
  
    res.json(token);
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

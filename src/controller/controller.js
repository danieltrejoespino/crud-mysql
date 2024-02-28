const jwt = require('jsonwebtoken');

const {actions_mysql} = require('../controller/controller_mysql')

const home = {
  test : (req,res) =>{
    const data = [
      {
        "fecha_leads": "22/09/1996"
      },
      {        
      }    ,{},{},{}
    ]
    // console.log(data[0].fecha_leads);

    if (data[0].fecha_leads === undefined) {
      console.log('sin datos');
    } else {
      console.log('con datos');
    }
    res.json('prueba')
  },
  
  testToken : (req,res) =>{
    res.json('con exito')
  },
  createToken : async (req,res) =>{
    const name = req.body.name
    const pass = req.body.pass
    // console.log(name.toUpperCase());
    if (!name || !pass) {
      console.log('Faltan datos');
      return res.status(403).json(`Verifica que envies usuario y pass`);
    }

    let resp = await actions_mysql.validateUser(name,pass)
    // console.log('----',resp);
    let dataSK = await actions_mysql.get_skey()
    let secretKey= dataSK[0].SK_NAME;
    
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
  verifyToken : async (req, res, next) => {      
    const bearerHeader = req.headers['authorization'];  
    if (typeof bearerHeader !== 'undefined') {    
      const bearer = bearerHeader.split(' ');      
      const bearerToken = bearer[1];      
      try {        

        let dataSK = await actions_mysql.get_skey()
        let secretKey= dataSK[0].SK_NAME;

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

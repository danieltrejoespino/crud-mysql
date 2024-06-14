const jwt = require('jsonwebtoken');

const {actions_mysql} = require('../controller/controller_mysql')

const home = {
  test : (req,res) =>{   
    res.status(200).send({ rspta: 'API LISTENING' });
  },  
  testToken : (req,res) =>{           
    res.status(200).send({ rspta: 'VALID TOKEN' });

  },
  createToken : async (req,res) =>{
    const name = req.body.name
    const pass = req.body.pass
    // console.log(name,pass);
    if (!name || !pass) {
      // console.log('Faltan datos');
      return res.status(403).json({ rspta: 'MISSING DATA TO GENERATE TOKEN' });
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
    
      res.json({token:token});
    } else {
      res.status(200).json({ rspta: 'INVALID USER OR PASSWORD' })
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
        return res.status(401).send({ rspta: 'INVALID TOKEN' });
      }
    } else {    
      return res.status(403).send({ rspta: 'A TOKEN IS REQUIRED FOR AUTHENTICATION.' });
    }
  }
}

module.exports = {home}

  // {
  //   "name":"Daniel",
  //   "correo":"Daniel.gmal"
  // }

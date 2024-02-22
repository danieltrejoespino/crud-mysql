const express = require('express')
const routes = require('./src/router/routers') 
const app = express()
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001
const https = require('https');
const fs = require('fs');


const privateKey = fs.readFileSync('./cert/clave-privada.key', 'utf8');
const certificate = fs.readFileSync('./cert/certificado.crt', 'utf8'); 

const credentials = {
  key: privateKey,
  cert: certificate,
 };

// app.use(bodyParser.json());
app.use(express.json());

app.use('/api',routes)


const server = https.createServer(credentials,app);


server.listen(port,(req,res)=>{
  console.log(`Servidor corriendo en puerto: ${port}`);
})
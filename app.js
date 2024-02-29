const express = require('express')
const routes = require('./src/router/routers') 
const app = express()
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001
const https = require('https');
const fs = require('fs');
const cors = require('cors')


const privateKey = fs.readFileSync('./cert/clave-privada.key', 'utf8');
const certificate = fs.readFileSync('./cert/certificado.crt', 'utf8'); 

const credentials = {
  key: privateKey,
  cert: certificate,
 };

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.use('/api_leads_online',routes)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

const server = https.createServer(credentials,app);


server.listen(port,(req,res)=>{
  console.log(`Servidor corriendo en puerto: ${port}`);
})
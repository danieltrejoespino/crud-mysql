const express = require('express')
const routes = require('./server/router/routers') 
const app = express()
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001


app.use(bodyParser.json());
app.use('/api',routes)

app.listen(port,(req,res)=>{
  console.log(`Servidor corriendo en puerto: ${port}`);
})
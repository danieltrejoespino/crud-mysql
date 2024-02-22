const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '172.20.1.149',
  user: 'R3s3nd1z*',
  password: 'tu_contraseña',
  database: 'servinventario'
})


module.exports = pool
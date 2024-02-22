const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '172.20.1.149',
  user: 'R3s3nd1z*',
  password: 'tu_contraseña',
  database: 'servinventario',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})


module.exports = pool
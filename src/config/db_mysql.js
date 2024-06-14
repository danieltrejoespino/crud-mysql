const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'online',
  password: 'AjI*5myT',
  database: 'api_online',
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
})

// const pool = mysql.createPool({
//   host: '172.20.1.149',
//   user: 'lresendiz',
//   password: 'R3s3nd1z*',
//   database: 'api_online',
//   waitForConnections: true,
//   connectionLimit: 2,
//   queueLimit: 0
// })


module.exports = pool

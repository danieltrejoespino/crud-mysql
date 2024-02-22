const pool = require('../config/db_mysql')

const testConn = {
  validarConexion: async () => {
    try {
        const [rows] = await pool.query('SELECT 1');
        return true; // Si la consulta es exitosa, devuelve true
    } catch (error) {
        console.error("Error validando la conexión:", error);
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }
}
}

const User = { 
  obtenerTodos: async () => {
      const [rows] = await pool.query('SELECT * FROM usuarios');
      return rows;
  },
  agregar: async (usuario) => {
    const [result] = await pool.query('INSERT INTO usuarios SET ?', usuario);
    return result;
}
}


module.exports = {
  testConn,User
}
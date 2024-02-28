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
      const [rows] = await pool.query('SELECT * FROM USERS');
      return rows;
  },
  obtenerSk: async () => {
    const [rows] = await pool.query('SELECT * from api_online.SECRETKEY WHERE ACTIVO=1');
    return rows;
  },
  commit: async () => {
    const [rows] = await pool.query('commit');
    return rows;
  },
  validarUsuario: async (usuario, password) => {
    try {
        // Primero, llama al procedimiento almacenado
        await pool.query('CALL VALIDATE_USER(?, ?, @p_existe);', [usuario, password]);
        
        // Luego, selecciona el resultado de la llamada anterior
        const [rows] = await pool.query('SELECT @p_existe AS existe;');

        // Acceso al valor de 'existe'
        const existe = rows[0].existe;

        return existe;
    } catch (error) {
        console.error('Error al validar el usuario:', error);
        throw error; // O manejar el error según sea necesario
    }
  },
  insertLeads: async (data) => {    
    const c =Object.values(data)
    const columns = c.map(() => '?');

    try {
        
        // await pool.query('CALL INSERT_LEADS(?, ?, @estatus_);', ['DANIEL', 'PRUEBA',1]);
        await pool.query(`CALL INSERT_LEADS(${columns}, @estatus_);`, Object.values(data));
        
        
        const [rows] = await pool.query('SELECT @estatus_ AS existe;');

        
        const existe = rows[0].existe;

        return existe;
    } catch (error) {
        console.error('Error al validar el usuario:', error);
        throw error; 
    }
  }
 
}


module.exports = {
  testConn,User
}
 const {testConn,User} = require('../models/login_mysql')

const actions_mysql = {
  conn : async (req,res) =>{        
    try {      
      await testConn.validarConexion();      
      res.json('conectado');
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json(error);
    }
  },
  get_skey : async () => {
    try {
      const data =await User.obtenerSk()
      return data      
    } catch (error) {
      return error
    }
  },
  check_user : async (req,res) => {
    try {
      const data =await User.obtenerTodos()
      console.log(data)
      res.json(data)
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json(error);      
    }
  },
  validateUser : async(name,pass)=>{
    try {            
      const usuarioValido = await User.validarUsuario(name, pass);            
      return usuarioValido;      
    } catch (error) {
        console.error("Error en el controlador mysql:", error);
        return error
    }
  },
  insert_leads : async(req,res)=>{    
    const datos= req.body
     
    if (Object.keys(datos).length === 0) {
      res.status(404).json('No puedes hacer un insert vacio')
    }else{

      datos.forEach(element => {  
        
          const lead_completo = fusionarObjetos(element); 
          //console.log(lead_completo);
          insert_datos(lead_completo)      
        
        
      });    

      res.json('datos insertados')  

    }//fin else    
    
  }

}

 

function fusionarObjetos(objetoNuevo) {
  const leadsTemplate =   {
    "fecha_leads": "",
    "nombres": "",
    "apellido_paterno": "",
    "apellido_materno": "",
    "rfc": "",
    "telefono": "",
    "email": "",
    "tarjeta_solicitada": "",
    "score_buro": "",
    "tnkpage_aterrizaje": "",
    "source_medio": "",
    "cpid": "",
    "campana": "",
    "idunico": "",
    "origen": "",
    "comentarios_1": "",
    "comentarios_2": "",
    "comentarios_3": "",
    "comentarios_4": "",
    "comentarios_5": "",
    "comentarios_6": "",
    "comentarios_7": "",
    "comentarios_8": "",
    "comentarios_9": "",
    "comentarios_10": "",
    "suscription_type": "",
    "user_agent": "",
    "fbc": "",
    "fbp": "",
    "telefono_secundario": "",
    "sexo": "",
    "estudios": "",
    "pais_nacimiento": "",
    "estado_nacimiento": "",
    "nacionalidad": "",
    "datos_personales_email": "",
    "datos_via_telefono": "",
    "calle": "",
    "num_ext": "",
    "num_int": "",
    "colonia": "",
    "codigo_postal": "",
    "municipio": "",
    "estado_residencia": "",
    "tiempo_residencia": "",
    "compania": "",
    "tipo_industria": "",
    "tiempo_c/empresa": "",
    "puesto": "",
    "ingresos": "",
    "fuente_ingresos": "",
    "tarjetas_credito": "",
    "digitos_tarjeta": "",
    "credito_auto": "",
    "hipoteca": "",
    "comentarios_11": "",
    "comentarios_12": "",
    "comentarios_13": "",
    "seguro": "",
    "plan": "",
    "modalidad": "",
    "articulo_139": "",
    "139_motivo": "",
    "articulo_492_funciones": "",
    "492_puesto": "",
    "492_accionista_socio": "",
    "492_nombre_sociedad": "",
    "autorizacion": "",
    "492_via_email": "",
    "wild_card_1" : "", 
    "wild_card_2" : "", 
    "wild_card_3" : "", 
    "arch" : "", 
    "id_origen_archivo" : "", 
    "f_hig" : "", 
    "hig_flag" : "", 
    "operable" : "", 
    "desc_no_op" : "", 
    "f_arch" : "", 
    "h_arch" : ""
  }
  const resultado = {};
  
  for (let clave in leadsTemplate) {
    
    if (leadsTemplate.hasOwnProperty(clave) && objetoNuevo.hasOwnProperty(clave)) {
       resultado[clave] = higiene(objetoNuevo[clave]);
    }else{
      resultado[clave] = leadsTemplate[clave]
    }
  }
  return resultado;
}

const higiene = (data) => {  
  let hData = data.toString().trim()

  return hData
}

async function insert_datos(lead_completo){
  try {            
    const usuarioValido = await User.insertLeads(lead_completo);            
    if (usuarioValido) {
      console.log('datos insertados');
      // res.json('datos insertados')  
    }    
    else{
      console.log('Error al insertar datos');
      // res.status(402).json('Error al insertar datos')
    }      
  } catch (error) {
      console.error("Error en el controlador mysql:", error);
      // res.status(500).json('ocurrio un error al insertar los datos')  
  }
}


module.exports = {actions_mysql}

 

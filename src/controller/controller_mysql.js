 const {testConn,User} = require('../models/actions_mysql')

const actions_mysql = {
  conn : async (req,res) =>{        
    try {      
      await testConn.validarConexion();            
      res.status(200).json({ rspta: 'conectado' })
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
      res.status(200).json({ rspta: 'No puedes hacer un insert vacio' })
    }else{
      const rspta = {
        success: true,        
        detailData: []
      } 
      let newData;  
      for (const iterator of datos) {        
        let lead_completo = fusionarObjetos(iterator);                          
        let data= await User.insertLeads(lead_completo)
        if (data) {
          await log_('Exito al guardar datos')
          newData = {
            idunico: lead_completo.idunico,
            success: true,
            message : ''
          }              
          rspta.detailData.push(newData)
        } else {
          await log_('Error al guardar datos')
          newData = {
            idunico: lead_completo.idunico,
            success: false,
            message : 'Error al insertar el registro'
          }              
          rspta.detailData.push(newData)
        }

      }
      res.status(200).json(rspta)      
      
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

async function log_ (data,opcion) {
  let r= await User.insertLog(data,opcion)
  if (r) {
    console.log('Exito: ',data);
  } else {
    console.log('Error: ',data);
  }
}



module.exports = {actions_mysql}

 

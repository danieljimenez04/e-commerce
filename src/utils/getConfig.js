//configuracion de axios para usar un header
//los header es informacion que se le envia a los backend
//las configuraciones son funciones
const getConfig=()=>({
    headers:{

        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
})
//esta es la configuracion que le vamos a pasar a axios para que se ejecute
export default getConfig
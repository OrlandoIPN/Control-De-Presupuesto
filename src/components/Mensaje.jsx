import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div> 
    //crea un componente que se le pueden pasar diferentes tipos si es correcto o diferentes estilos
    //se le pasa children con todo el mensaje
  )
}


export default Mensaje
import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje] = useState('')
    const handlePresupuesto = (e) => {
        e.preventDefault()

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido')
            //  no se ejecutan las lineas siguientes y ya no se ejecta el ciclo de las demas lineas
            return
        }

        setMensaje('')
        setIsValidPresupuesto(true)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className='formulario'
                onSubmit={handlePresupuesto}>
                <div className='campo'>
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type="number"
                        placeholder='Añade tu Presupuesto'
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Añadir" />
                {/* Se le pasa el mensaje como children y el tipo como clase */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto

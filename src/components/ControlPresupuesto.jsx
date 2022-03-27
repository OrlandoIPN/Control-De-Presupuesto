import {useEffect, useState} from 'react'
import {CircularProgressbar , buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

    const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {


    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0  )
        //cuando se tiene un arreglo grande con objetos reduce  va a acumular ese arreglo en una sola variable
        //este metodo de arreglos "Es importante que sean arreglos" tiene dos parametros
        //el "total" acumulado y "gasto" la instancia  en la que se va a air iterando en cada objeto
         //accedo a gasto.cantidad y le sumo el total inicio en 0
         const totalDisponible = presupuesto - totalGastado;

         //Calcular el PORCENTAJE gastado 
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        //toFixed retorna 2 valores

         setDisponible(totalDisponible)
         setGastado(totalGastado)
         setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
         }, 1000);

    }, [gastos])
    

    //Funcion que convierte la cantidad a dolares pero no muta el state
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    
    const handleReset = () =>{
        const resultado = confirm('¿Deseas Reiniciar presupuesto y gastos?');
        if (resultado) {
           setGastos([])
           setPresupuesto(0) 
           setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6' 
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button
                className='reset-app'
                type='button'
                onClick={handleReset}
                >
                    Resetear APP
                </button>
                <p>
                    <span>Presuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
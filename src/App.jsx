import { useState, useEffect } from 'react'                        //Recomendación
import Filtros from './components/Filtros'
import Header from './components/Header'                // importar primero todo lo de react
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'                   //luego components
// Lueho imagenes y funciones extras
import { generarId } from './helpers'                     // No requerimos el nombre del  archivo por que es el index
import IconoNuevoGasto from './img/nuevo-gasto.svg'
function App() {

  const [gastos, setGastos] = useState(
    // JSON.parse convierto la cadena como un ojeto para interpretarlo bien 
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    // Object.keys(gastoEditar) SI TIENE ALGO entonces...
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    //JSON.stringify Convierto gastos en una cadena por que no se pueden enviar datos como arreglos
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrado = gastos.filter(gasto => gasto.categoria === filtro);
      //Filtrar gastos por categoría
      setGastosFiltrados(gastosFiltrado)
    }
  }, [filtro])
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }   
  }, [])
  
  
  const handleNuevogasto = () => {
    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === 
        gasto.id ? gasto : gastoState)
        // esta funcion identifica entre los gastos el gasto que tenga el mismo id
        // y retorna los que no son de ese id  para no perder información
        setGastos(gastosActualizados);
        setGastoEditar({})
    } else {
      //Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto]) // copia de gastos agregando un gasto
    }
    setAnimarModal(false)         //cuando se guarda  e hace una animacion del modal para cerrarse
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados);
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* Si este es verdero ejecuta lo de la derecha */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto}
              alt="icono-nuevo-gasto"
              onClick={handleNuevogasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}
    </div>
  )
}

export default App

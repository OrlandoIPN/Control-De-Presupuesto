import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados
}) => {
  return (
    <div className="listado-gastos contenedor">
     

      {/* SI HAY UN FILTRO DEFINIDO ITERAMOS SOBRE GASTOS FILTRADOS SI NO SOBRE TODOS LOS GASTOS */}

      {filtro ? (
        <>
         <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta Categoria'}</h2>
          {gastosFiltrados.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
        <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
       {gastos.map(gasto => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
        ))}
        </>
      )
      }

      {/* el parenetesís que envuelve al componente 
           es por que así decimos que hay un return implicito */}
    </div>
  )
}

export default ListadoGastos
import React from 'react'

export default function Vehiculos({vehiculos}){
  return (
    <tr key={vehiculos.numSerie}>
            <th>{vehiculos.numSerie}</th>
            <td>{vehiculos.placa}</td>
            <td>{vehiculos.marca}</td>
            <td>{vehiculos.modelo}</td>
            <td>{vehiculos.referencia}</td>
            <td>{vehiculos.serie}</td>
            <td>{vehiculos.color}</td>
            <td>{vehiculos.kilometraje}</td>
            <td>{vehiculos.ciudadProcedencia}</td>
            <td>{vehiculos.usuario}</td>
            <td>{vehiculos.tipovehiculo.nombre}</td>
            <td>
                <button>Ver</button>
            </td>
        </tr>
  )
}
import React, {useState} from 'react'
import AppLayout from './Containers/Layout';
import Table from './Facturacion/Components/Table'

export default function Facturacion() {
  const [ventas, setVentas] = useState([
    { cliente: "David Vega", factura: "001-002-000000989", valor: "$ 324,60", estado: "Autorizado" },
    { cliente: "Juanito Alima", factura: "001-002-000000984", valor: "$ 324,60", estado: "Finalizado" },
    { cliente: "Bryan Lugmania", factura: "001-002-000000978", valor: "$ 324,60", estado: "Autorizado" },
    { cliente: "dennis Perez", factura: "001-002-000000956", valor: "$ 324,60", estado: "Finalizado" },
  ])
  return (
    <AppLayout>
<Table ventas={ventas} setVentas={setVentas} />
  </AppLayout>
  )
}


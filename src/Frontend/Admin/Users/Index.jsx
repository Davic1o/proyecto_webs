import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import '../Users/Components/Table.css'

export default function Index() {

const  usuarios= [
    { nombre: "David Vega", email: "vegavareladavid@gmail.com", rol: "Tecnico" },
    { nombre: "Ana López", email: "ana.lopez@gmail.com", rol: "Cliente" },
    { nombre: "Carlos Pérez", email: "carlos.perez@gmail.com", rol: "Tecnico" },
    { nombre: "María Ruiz", email: "maria.ruiz@gmail.com", rol: "Cliente" }
]


  return (
    <div className="section-container">
    <AppLayout>
    <Table usuarios={usuarios} />
    </AppLayout>
      </div>
  )
}


















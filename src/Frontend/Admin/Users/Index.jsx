import React from 'react';
import Input from '../../../Components/Input.jsx'
import Table from '../Components/Table.jsx';
import Boton from '../../../Components/Buton.jsx';
import Sidebar from '../Containers/Sidebar.jsx';
import Header from '../Containers/Header.jsx';
import './App.css'

class Index extends React.Component {
  constructor(props){
    super(props)
    this.state={
      usuarios: [
        { nombre: "David Vega", email: "vegavareladavid@gmail.com", rol: "Tecnico" },
        { nombre: "Ana López", email: "ana.lopez@gmail.com", rol: "Cliente" },
        { nombre: "Carlos Pérez", email: "carlos.perez@gmail.com", rol: "Tecnico" },
        { nombre: "María Ruiz", email: "maria.ruiz@gmail.com", rol: "Cliente" }
    ]}
  }
  render(){
    return (
      <div className="App">
        <div className="users-container">
          <Sidebar></Sidebar>
        <main className="main-content">
          <header className="header">
            <Input fondo="Buscar"></Input>
            <span>Bienvenido, Administrador</span>
          </header>
          <div className="user-management">
            <Header></Header>
            <div className='user-create'>
              <Boton texto="Crear" estilo="aceptar"></Boton>
            </div>
            
            <Table usuarios={this.state.usuarios}></Table>
          </div>
        </main>
    </div>

      </div>
    );
  }
  
}
export default Index;

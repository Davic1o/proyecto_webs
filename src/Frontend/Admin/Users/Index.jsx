import React from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from '../Components/Table.jsx';


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

  onclick=()=>{
    console.log('click')
  }
  render(){
    const { usuarios } = this.state; 
    return (
      <div className="App">
        <AppLayout>
        <Table usuarios={usuarios} />
        </AppLayout>
          </div>
    );
  }
  
}
export default Index;

import React from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';


class Index extends React.Component {
  constructor(props){
    super(props)
    this.state={
      ventas: [
        { cliente: "David Vega", factura: "vegavareladavid@gmail.com", valor: "Tecnico", estado: "Tecnico" },

    ]}
  }

  onclick=()=>{
    console.log('click')
  }
  render(){
    const { ventas } = this.state; 
    return (
      <div className="App">
        <AppLayout>
        <Table ventas={ventas} />
        </AppLayout>
          </div>
    );
  }
  
}
export default Index;

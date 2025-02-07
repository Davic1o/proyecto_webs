import React, { useState, useEffect } from 'react';
import AppLayout from './Pedidos/Containers/Layout.jsx';
import Table from './Pedidos/Components/Table.jsx';
import axios from 'axios';
export default function Index() {
  // Gestionamos el estado de los pedidos
  const token=localStorage.getItem('token')
  const userStorage=localStorage.getItem('user')
  const user=JSON.parse(userStorage)
  console.log(user)
  // Gestionamos el estado de los pedidos
  const [pedidos, setPedidos] = useState([]);
  const [clientes,setClientes]=useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8000/pedidos/tecnicos/${user._id}`,{headers: {authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los pedidos",res)
    setPedidos(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[token, user._id])
  useEffect(()=>{
    axios.get("http://localhost:8000/users/clientes",{headers: {Authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los clientes",res)
    setClientes(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[])
  

  return (
    <div className="section-container">
      <AppLayout>
        <Table pedidos={pedidos} setPedidos={setPedidos} token={token} user={user} clientes={clientes}/>
      </AppLayout>
    </div>
  );
}

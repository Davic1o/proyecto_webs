import React, { useState, useEffect } from 'react';
import AppLayout from './Containers/Layout';
import Table from './Pedidos/Components/Table';
import axios from 'axios';
export default function Index() {
  const token=localStorage.getItem('token')
  const userStorage=localStorage.getItem('user')
  const user=JSON.parse(userStorage)
  
  // Gestionamos el estado de los pedidos
  const [pedidos, setPedidos] = useState([]);
  const [tecnicos, setTecnicos]= useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8000/pedidos/clientes/${user._id}`,{headers: {authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los pedidos",res)
    setPedidos(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[token, user._id])
  useEffect(()=>{
    axios.get(`http://localhost:8000/users/tecnicos/`,{headers: {authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los tecnicos",res)
    setTecnicos(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[])

  return (
    <div className="section-container">
      <AppLayout>
        <Table pedidos={pedidos} setPedidos={setPedidos} token={token} user={user} tecnicos={tecnicos}/>
      </AppLayout>
    </div>
  );
}

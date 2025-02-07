import React, { useState, useEffect } from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import '../Users/Components/Table.css';
import axios from 'axios';

export default function Index() {
  // Gestionamos el estado de los usuarios
  const [pedidos, setPedidos] = useState([
  ]);
  const [clientes,setClientes]=useState([])
  const [tecnicos,setTecnicos]=useState([])
  const token =localStorage.getItem('token');
  
 
  useEffect(()=>{
    axios.get("http://localhost:8000/users/clientes",{headers: {Authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los clientes",res)
    setClientes(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[])
  useEffect(()=>{
    axios.get("http://localhost:8000/users/tecnicos",{headers: {Authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los tecnicos",res)
    setTecnicos(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[])
  useEffect(()=>{
    axios.get("http://localhost:8000/pedidos",{headers: {authorization:`Bearer ${token}`}})
  .then(res => {
    console.log("estos son los pedidos",res)
    setPedidos(res.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error.message)})
  },[])

  return (
    <div className="section-container">
      <AppLayout>
        <Table pedidos={pedidos} setPedidos={setPedidos} clientes={clientes}  tecnicos={tecnicos} />
      </AppLayout>
    </div>
  );
}

















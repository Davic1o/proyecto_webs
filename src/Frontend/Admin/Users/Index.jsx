import React, { useState,useEffect } from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import '../Users/Components/Table.css';
import axios from 'axios';

export default function Index() {
  // Gestionamos el estado de los usuarios
  const [usuarios, setUsuarios] = useState(
  []);
  const token= localStorage.getItem('token');
  useEffect(()=>{
    axios.get("http://localhost:8000/users",{headers: {Authorization: `Bearer ${token}`}})
  .then(users => {
    console.log(users)
    setUsuarios(users.data.data)})
  .catch(error => {console.log("Respuesta fallida: "+error)})
  },[])

  return (
    <div className="section-container">
      <AppLayout>
        <Table usuarios={usuarios} setUsuarios={setUsuarios} />
      </AppLayout>
    </div>
  );
}

















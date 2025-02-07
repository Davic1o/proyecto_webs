import React, {useState, useEffect} from 'react'
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import axios from 'axios';


export default function Index() {

  const [facturas, setFacturas] = useState([]);
  const token= localStorage.getItem('token')
  useEffect(() => {
    // Obtener todas las facturas
    axios
      .get("http://localhost:8000/facturas", {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        setFacturas(res.data.data);
      })
      .catch((error) => {
        console.log("Respuesta fallida: " + error);
      });
  }, []);

 


  return (
    <div className="section-container">
    <AppLayout>
    <Table ventas={facturas} setVentas={setFacturas} token={token} />
    </AppLayout>
      </div>
  )
};


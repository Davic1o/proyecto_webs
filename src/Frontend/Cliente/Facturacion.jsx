import React, {useState,useEffect} from 'react'
import AppLayout from './Containers/Layout';
import Table from './Facturacion/Components/Table'
import axios from 'axios';


export default function Facturacion() {
  const token=localStorage.getItem('token')
  const userStorage=localStorage.getItem('user')
  const user=JSON.parse(userStorage)
  
  const [ventas, setVentas] = useState([])
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/facturas/${user._id}`,{headers: {authorization:`Bearer ${token}`}})
      .then(response=>{
        const facturas=response.data.data
        setVentas(facturas)
      })
  },[])
  return (
    <AppLayout>
<Table ventas={ventas} setVentas={setVentas} user={user}/>
  </AppLayout>
  )
}


import React, { useState, useEffect } from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import '../Users/Components/Table.css';
import axios from 'axios';
import Loading from '../../../Components/Loading.jsx';


export default function Index() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loadingTecnicos, setLoadingTecnicos] = useState(true);
  const [loadingPedidos, setLoadingPedidos] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users/clientes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClientes(res.data.data);
      } catch (error) {
        console.error("Error al obtener clientes:", error.message);
      } finally {
        setLoadingClientes(false);
      }
    };

    const fetchTecnicos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users/tecnicos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTecnicos(res.data.data);
      } catch (error) {
        console.error("Error al obtener técnicos:", error.message);
      } finally {
        setLoadingTecnicos(false);
      }
    };

    const fetchPedidos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/pedidos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedidos(res.data.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error.message);
      } finally {
        setLoadingPedidos(false);
      }
    };

    fetchClientes();
    fetchTecnicos();
    fetchPedidos();
  }, [token]);

  return (
    <div className="section-container">
      <AppLayout>
        {loadingClientes || loadingTecnicos || loadingPedidos ? (
          <Loading />
        ) : (
          <Table
            pedidos={pedidos}
            setPedidos={setPedidos}
            clientes={clientes}
            tecnicos={tecnicos}
          />
        )}
      </AppLayout>
    </div>
  );
}

















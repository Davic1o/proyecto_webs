import React, { useState, useEffect } from 'react';
import AppLayout from './Containers/Layout';
import Table from './Pedidos/Components/Table';
import axios from 'axios';
import Loading from '../../Components/Loading';

export default function Index() {
  const token = localStorage.getItem("token");
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);

  const [pedidos, setPedidos] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [loadingTecnicos, setLoadingTecnicos] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/pedidos/clientes/${user._id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        setPedidos(res.data.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error.message);
      } finally {
        setLoadingPedidos(false);
      }
    };
    fetchPedidos();
  }, [token, user._id]);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users/tecnicos/", {
          headers: { authorization: `Bearer ${token}` },
        });
        setTecnicos(res.data.data);
      } catch (error) {
        console.error("Error al obtener técnicos:", error.message);
      } finally {
        setLoadingTecnicos(false);
      }
    };
    fetchTecnicos();
  }, [token]);

  return (
    <div className="section-container">
      <AppLayout>
        {loadingPedidos || loadingTecnicos ? (
          <Loading />
        ) : (
          <Table
            pedidos={pedidos}
            setPedidos={setPedidos}
            token={token}
            user={user}
            tecnicos={tecnicos}
          />
        )}
      </AppLayout>
    </div>
  );
}

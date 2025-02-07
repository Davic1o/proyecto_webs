import React, { useState, useEffect } from 'react';
import AppLayout from './Pedidos/Containers/Layout.jsx';
import Table from './Pedidos/Components/Table.jsx';
import axios from 'axios';
import Loading from '../../Components/Loading';

export default function Index() {
  const token = localStorage.getItem("token");
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  console.log(user);

  // Estados
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [loadingClientes, setLoadingClientes] = useState(true);

  // Cargar pedidos del técnico
  useEffect(() => {
    axios
      .get(`http://localhost:8000/pedidos/tecnicos/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPedidos(res.data.data);
      })
      .catch((error) => {
        console.error("Respuesta fallida en pedidos: " + error.message);
      })
      .finally(() => setLoadingPedidos(false));
  }, [token, user._id]);

  // Cargar clientes
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClientes(res.data.data);
      })
      .catch((error) => {
        console.error("Respuesta fallida en clientes: " + error.message);
      })
      .finally(() => setLoadingClientes(false));
  }, [token]);

  // Mostrar estado de carga o la tabla
  return (
    <div className="section-container">
      <AppLayout>
        {loadingPedidos || loadingClientes ? (
          <p>Cargando datos...</p>
        ) : (
          <Table
            pedidos={pedidos}
            setPedidos={setPedidos}
            token={token}
            user={user}
            clientes={clientes}
          />
        )}
      </AppLayout>
    </div>
  );
}
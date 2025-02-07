import React, { useState,useEffect } from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import '../Users/Components/Table.css';
import axios from 'axios';
import Loading from '../../../Components/Loading.jsx';

export default function Index() {
  const [loading, setLoading] = useState(true); // Estado para mostrar la carga
  const [usuarios, setUsuarios] = useState([]); // Estado para los usuarios
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(response.data.data); // Asigna los datos obtenidos
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUsuarios();
  }, [token]);

  return (
    <div className="section-container">
      <AppLayout>
        {loading ? <Loading /> : <Table usuarios={usuarios} setUsuarios={setUsuarios} />}
      </AppLayout>
    </div>
  );
}

















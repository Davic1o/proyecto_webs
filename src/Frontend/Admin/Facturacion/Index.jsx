import React, {useState, useEffect} from 'react'
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import axios from 'axios';
import Loading from '../../../Components/Loading.jsx';

export default function Index() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const res = await axios.get("http://localhost:8000/facturas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFacturas(res.data.data);
      } catch (error) {
        console.error("Error al obtener facturas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacturas();
  }, [token]);

  return (
    <div className="section-container">
      <AppLayout>
        {loading ? (
          <Loading />
        ) : (
          <Table ventas={facturas} setVentas={setFacturas} token={token} />
        )}
      </AppLayout>
    </div>
  );
}

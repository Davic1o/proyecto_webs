import React, {useState,useEffect} from 'react'
import AppLayout from './Containers/Layout';
import Table from './Facturacion/Components/Table'
import axios from 'axios';
import Loading from '../../Components/Loading'

export default function Facturacion() {
  const token = localStorage.getItem("token");
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/facturas/${user._id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        setVentas(response.data.data);
      } catch (error) {
        console.error("Error al obtener facturas:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, [token, user._id]);

  return (
    <AppLayout>
      {loading ? (
        <Loading />
      ) : (
        <Table ventas={ventas} setVentas={setVentas} user={user} />
      )}
    </AppLayout>
  );
}


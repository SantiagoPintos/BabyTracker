import { useState, useEffect } from 'react';
import { API_URL } from '../constants/constants';
import AgregarEvento from './AgregarEvento';

const Dashboard = () => {
  const [ categorias, setCategorias ] = useState([]);

  useEffect(() => {
    fetch(API_URL+'categorias.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': localStorage.getItem('token'),
            'iduser': localStorage.getItem('id')
        }
    })
    .then(r => {
        if(r.status === 200){
            return r.json();
        }
        return Promise.reject({error: r.status, msj: "Algo salió mal"});
    })
    .then(data => {
        setCategorias(data);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  return (
    <div>
      <AgregarEvento categorias={categorias} />
    </div>
  )
}

export default Dashboard;

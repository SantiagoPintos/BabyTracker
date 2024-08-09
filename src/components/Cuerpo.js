import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/constants'
import { cargar } from './../features/categoriasSlice'
import Header from './Header'
import AgregarEvento from './AgregarEvento'
import { cerrarSesion } from '../utils/ManejadorDeLogin'

const Cuerpo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ tokenValido, setTokenValido ] = useState(true);

    const user = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    useEffect(() => {
        if(user === null || id === null){
            navigate('/login');
        }
        fetch(API_URL+'categorias.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apiKey': user,
            'iduser': id,
          }
        })
        .then(response => response.json())
        .then(data => {
          if(data.codigo === 401){
            //cubre caso en que token no es válido
            cerrarSesion();
            setTokenValido(false);
            navigate('/login');
          } else {
            dispatch(cargar(data.categorias));
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });      
    }, []);
    
    return (
      <div>
        { 
          tokenValido ? 
          <div>
            <Header />
            <AgregarEvento />
            <Outlet />
          </div> 
          : 
          <div>
            <p>Expiró la sesión, redirigiendo al login...</p>
          </div>
        }
      </div>
    )
}

export default Cuerpo
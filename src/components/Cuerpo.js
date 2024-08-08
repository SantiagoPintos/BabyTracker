import React from 'react'
import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/constants'
import { cargar } from './../features/categoriasSlice'
import Header from './Header'
import AgregarEvento from './AgregarEvento'

const Cuerpo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
          dispatch(cargar(data.categorias));
        })
        .catch((error) => {
          console.error('Error:', error);
        });      
    }, []);
    
    return (
      <div>
        <Header />
        <AgregarEvento />
        Cuerpo
        <Outlet />
      </div>
    )
}

export default Cuerpo
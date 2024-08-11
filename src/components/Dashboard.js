import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/constants'
import { cargar } from '../features/categoriasSlice'
import { guardar } from '../features/eventosSlice'
import { cerrarSesion } from '../utils/ManejadorDeLogin'
import Header from './Header'
import AgregarEvento from './AgregarEvento'
import ListarEventos from './ListarEventos'
import InformeEventos from './InformeEventos'
import Analisis from './Analisis'

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ tokenValido, setTokenValido ] = useState(true);

    const user = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    useEffect(() => {
        if(user === null || id === null){
            navigate('/login');
        }
        //carga categorías
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

        //almacena los eventos del usuario
        fetch(`${API_URL}/eventos.php?idUsuario=${id}`, {
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
                  navigate('/login');
              } else {
                  dispatch(guardar(data.eventos));
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
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <AgregarEvento />
              </div>
              <div className="col-md-6 mb-3">
                <ListarEventos />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <InformeEventos />
              </div>
              <div className="col-md-6 mb-3">
                <Analisis />
              </div>
            </div>
          </div>
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

export default Dashboard
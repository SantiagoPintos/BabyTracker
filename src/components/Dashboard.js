import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/constants'
import { cargar } from '../features/categoriasSlice'
import { guardar } from '../features/eventosSlice'
import { cerrarSesion } from '../utils/ManejadorDeLogin'
import AgregarEvento from './AgregarEvento'
import ListarEventos from './ListarEventos'
import InformeEventos from './InformeEventos'
import GraficoCantidades from './GraficoCantidades'
import ComidasUltimaSemana from './ComidasUltimaSemana'
import TiempoParaProximoBiberon from './TiempoParaProximoBiberon';
import { loguear, desloguear } from "../features/logueadoSlice";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ tokenValido, setTokenValido ] = useState(true);

    const user = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    useEffect(() => {
      if(user === null || id === null){
        navigate('/login');
        return;
      }
      dispatch(loguear());
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
                  dispatch(desloguear());
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
        <div className="container mt-4">
          <div className="row d-flex align-items-stretch">
            <div className="col-md-6 mb-3 d-flex flex-column">
              <AgregarEvento />
            </div>
            <div className="col-md-6 mb-3 d-flex flex-column">
              <ListarEventos />
            </div>
          </div>
          <div className="row d-flex align-items-stretch">
            <div className="col-md-6 mb-3 d-flex flex-column">
              <InformeEventos />
            </div>
            <div className="col-md-6 mb-3 d-flex flex-column">
              <TiempoParaProximoBiberon />
            </div>
          </div>
          <div className="row d-flex align-items-stretch my-4">
            <h4 className="mb-3 text-center">Gráficas</h4>
            <div className="col-md-6 mb-3 d-flex flex-column">
              <GraficoCantidades />
            </div>
            <div className="col-md-6 mb-3 d-flex flex-column">
              <ComidasUltimaSemana />
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
import { useSelector } from "react-redux";
import { API_URL } from "../constants/constants";
import { useState, useRef } from "react";
import { cerrarSesion } from '../utils/ManejadorDeLogin';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregar } from "../features/eventosSlice";
import { TextField, MenuItem, Button, Box, Typography, Container } from '@mui/material';

const AgregarEvento = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const categorias = useSelector(state => state.categorias.categorias);
  const [categoria, setCategoria] = useState(null);
  const detalle = useRef('');
  const fecha = useRef('');

  const cargarCategorias = (event) => {
    const idCategoria = event.target.value;
    if(idCategoria === -1) return;
    setCategoria(idCategoria);
  };

  const agregarEvento = () => {
    if(fecha.current.value === '') {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      fecha.current.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    const fechaActual = new Date().toISOString().split('T')[0];
    if(categoria === null || categoria === -1 || detalle.current.value === '' || new Date(fecha.current.value).toISOString().split('T')[0] > new Date(fechaActual)){
      alert('Datos incorrectos');
      return;
    }
    const usuario = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const evento = {
      idCategoria: categoria,
      idUsuario: id,
      detalle: detalle.current.value,
      fecha: fecha.current.value,
    };
    fetch(API_URL+'eventos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': usuario,
        'iduser': id,
      },
      body: JSON.stringify(evento)
    })
    .then(response => response.json())
    .then(data => {
      if(data.codigo === 200){
        alert(data.mensaje);
        detalle.current.value = '';
        fecha.current.value = '';
        //se agrega evento al store para actualizar la lista de eventos de forma automática
        dispatch(agregar(evento));
      } else {
        cerrarSesion();
        navigate('/login');
        alert(data.mensaje);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h2>Agregar nuevo evento</h2>
        <div className="form-floating">
          <input type="text" className="form-control" id="detalle" ref={detalle} />
          <label htmlFor="nombre">Detalles</label>
        </div>
        <div className="form-floating my-3">
          <select className="form-select" id="selectDepto" onChange={cargarCategorias}>
              <option key={-1} value={-1}>Seleccione...</option>
              {
                categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
                ))
              }
          </select>
          <label htmlFor="selectDpto">Categoría</label>
        </div>
        <div className="form-floating">
          <input type="datetime-local" className="form-control" id="detalle" ref={fecha} />
          <label htmlFor="nombre">Detalles</label>
        </div>
         <input className="btn btn-primary my-3" type="button" value="Agregar" onClick={agregarEvento}/>
      </div>
    </div>
  )
};

export default AgregarEvento;

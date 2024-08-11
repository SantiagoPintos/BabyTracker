import { useSelector } from "react-redux";
import { API_URL } from "../constants/constants";
import { useState, useRef } from "react";
import { cerrarSesion } from '../utils/ManejadorDeLogin';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregar } from "../features/eventosSlice";
import { TextField, MenuItem, Button, Box, Typography, Alert, Snackbar } from '@mui/material';

const AgregarEvento = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const categorias = useSelector(state => state.categorias.categorias);
  const [categoria, setCategoria] = useState(null);
  const detalle = useRef('');
  const fecha = useRef('');
  const [ alerta, setAlerta ] = useState(false);

  const cargarCategorias = (event) => {
    const idCategoria = event.target.value;
    if(idCategoria === -1) return;
    setCategoria(idCategoria);
  };

  const cerrarAlert = () => {
    setAlerta(false);
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
      setAlerta(true);
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
      console.log(data);
      if(data.codigo === 200){
        alert(data.mensaje);
        //api responde la id del evento así que agrega al estado global para evitar errores al renderizar un evento sin id
        //y eliminar antes de que se ejecute el useEffect con el fetch de eventoss
        evento.id = data.idEvento;
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>Registrar nuevo evento</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Detalles"
          variant="outlined"
          fullWidth
          inputRef={detalle}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        {/*
          TODO: si se usa directamente el componente Select combinado con Label 
          el primero no no respeta padding ni márgenes por algúna razón random,
          mientras tanto se usa TextField
        */}
        <TextField
          select
          label="Categoría"
          variant="outlined"
          fullWidth
          onChange={cargarCategorias}
        >
          <MenuItem value={-1}>Seleccione...</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>
              {categoria.tipo}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Fecha y hora"
          type="datetime-local"
          variant="outlined"
          fullWidth
          /* Se usa shrink para evitar que dd/mm/aa se superponga con el label */
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={fecha}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={agregarEvento}
        >
          Agregar
        </Button>
      </Box>
      {alerta &&
      /* Se usa alert dentro de Snacbar para que la posición no dependa del contenedor padre
        así se puede mostrar en cualquier parte de la pantalla
        
        Falta personalizar mensaje según dato faltante!!!!!
      */
        <Snackbar
        open={alerta}
        autoHideDuration={3000}
        onClose={cerrarAlert}
        >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Datos de evento incompletos
        </Alert>
      </Snackbar>
      }

  
    </Box>
  )
};

export default AgregarEvento;

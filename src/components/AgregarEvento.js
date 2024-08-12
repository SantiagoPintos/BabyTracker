import { useSelector } from "react-redux";
import { API_URL } from "../constants/constants";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { agregar } from "../features/eventosSlice";
import { Box, Alert, Snackbar, Backdrop, CircularProgress } from '@mui/material';

const AgregarEvento = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.categorias);
  //se inicializa en -1 porque MUI select no permite seleccionar el primer item si el value es null
  const [categoria, setCategoria] = useState(-1);
  const detalle = useRef('');
  const fecha = useRef('');
  const [ cargando, setCargando ] = useState(false);
  const [ snackbar, setSnackbar ] = useState(false);
  const [ snackbarMensaje, setSnackbarMensaje ] = useState('');
  const [ severidadDeAlert, setSeveridadDeAlert ] = useState(null);

  const cargarCategorias = (event) => {
    const idCategoria = event.target.value;
    if(idCategoria === -1) return;
    setCategoria(idCategoria);
  };

  const cerrarAnimacion = () => {
    setCargando(false);
  };
  const cerrarSnackbar = (event, reason) => {
    if(reason == 'clickaway'){
      return;
    }
    setSnackbar(false);
  };

  const agregarEvento = () => {
    setCargando(true);
    if(fecha.current.value === '') {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      fecha.current.value = `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    const fechaActual = new Date().toISOString().split('T')[0];
    if(categoria === null || categoria === -1 || detalle.current.value === '' || new Date(fecha.current.value).toISOString().split('T')[0] > new Date(fechaActual)){
      setCargando(false);
      setSnackbar(true);
      setSnackbarMensaje('Datos incompletos');
      setSeveridadDeAlert('error')
      return;
    }
    const usuario = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const evento = {
      idCategoria: `${categoria}`,
      idUsuario: `${id}`,
      detalle: detalle.current.value,
      fecha: fecha.current.value,
    };
    // eliminar "T" de la fecha para que coincida con el formato que viene dese la API
    //esto evita problemas al comparar fechas
    //el formato "2024-08-07T19:41" se convierte en "2024-08-07 19:41"
    evento.fecha = evento.fecha.replace('T', ' ');
  
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
        setCargando(false);
        setSnackbar(true);
        setSnackbarMensaje('Evento guardado!');
        setSeveridadDeAlert('success')
        //api responde la id del evento así que agrega al estado global para evitar errores al renderizar un evento sin id
        //y eliminar antes de que se ejecute el useEffect con el fetch de eventoss
        evento.id = data.idEvento;
        detalle.current.value = '';
        fecha.current.value = '';
        //se agrega evento al store para actualizar la lista de eventos de forma automática
        dispatch(agregar(evento))
      } else {
        setCargando(false);
        setSnackbar(true);
        setSnackbarMensaje('Algo salió mal');
        setSeveridadDeAlert('error')
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setCargando(false);
      setSnackbar(true);
      setSnackbarMensaje('Algo salió mal '+error.mensaje);
      setSeveridadDeAlert('error');
    });
  };

  //Se usa Box para que el alert y animación funcionen
  return (
    <Box sx={{ p: 2 }}>
      <div className="container">
        <h4 className="text-center mb-4">Guardar nuevo evento</h4>
        
        <div className="mb-3">
          <label htmlFor="detalles" className="form-label">Detalles</label>
          <input
            type="text"
            className="form-control"
            id="detalles"
            ref={detalle}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            className="form-select"
            id="categoria"
            onChange={cargarCategorias}
          >
            <option value={-1}>Seleccione...</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha y hora</label>
          <input
            type="datetime-local"
            className="form-control"
            id="fecha"
            ref={fecha}
          />
        </div>
        
        <div className="text-center">
          <button
            className="btn"
            onClick={agregarEvento}
            style={{ color: 'white', backgroundColor: '#272727'}}
          >
            Agregar
          </button>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cargando}
        onClick={cerrarAnimacion}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={cerrarSnackbar}
      >
        <Alert
          onClose={cerrarSnackbar}
          severity={severidadDeAlert}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMensaje}
        </Alert>
      </Snackbar>

    </Box>
  )
};

export default AgregarEvento;

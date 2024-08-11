import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { API_URL, IMG_API_URL } from "../constants/constants";
import { Card, CardContent, CardMedia, Typography, Box, Button, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { eliminar } from "../features/eventosSlice";

const TarjetaEvento = ({evento}) => {
  const dispatch = useDispatch();
  //para animación de componente backdrop y snackbar: 
  //https://mui.com/material-ui/react-backdrop/#example
  //https://mui.com/material-ui/react-backdrop/#example
  const [ cargando, setCargando ] = useState(false);
  const [ snackbar, setSnackbar ] = useState(false);
  const [ snackbarMensaje, setSnackbarMensaje ] = useState('');
  //se usa para controlar el color del alert que se muestra dentro del snackbar
  //'error': rojo
  //'success': verde
  const [ severidadDeAlert, setSeveridadDeAlert ] = useState(null);

  const categorias = useSelector(state => state.categorias.categorias);
  /*
      Se usa "==" en vez de "===" de forma INTENCIONAL
      El id que viene de la api es string, pero el id almacenado
      por el globalState de Redux es un nro, por lo tanto la comparacion
      debe ser débil
  */
  const categoria = categorias.find(categoria => categoria.id == evento.idCategoria);
  //img es de 38x38px
  //se usa condicional porque a veces la api tarda en responder (creo), y esto provoca que categoria sea undefined, por lo tanto no se puede acceder a categoria.imagen
  //de esta forma solo se renderiza la imagen cuando existen eventos
  const imgUrl = categoria ? `${IMG_API_URL}${categoria.imagen}.png` : '';

  const cerrarAnimacion = () => {
    setCargando(false);
  };

  //reason y clickaway provienen de documentación de MUI
  const cerrarSnackbar = (event, reason) => {
    if(reason == 'clickaway'){
      return;
    }
    setSnackbar(false);
  };

  const eliminarEvento = () => {
    setCargando(true);
    const apikey = localStorage.getItem('token');
    const iduser = localStorage.getItem('id');
    const idEvento = evento.id;
    fetch(`${API_URL}eventos.php?idEvento=${idEvento}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'apikey':apikey,
        'iduser':iduser
      }
    })
    .then(r=>r.json())
    .then(data=>{
      if(data.codigo === 200){
        setCargando(false);
        setSnackbar(true);
        setSnackbarMensaje('Evento eliminado!');
        setSeveridadDeAlert('success')
        /* Este delay de 3s es para evitar el siguiente problema:
          Al momento de eliminar el evento, se envía la petición y actualiza el estado local,
          esto provoca que la lista de Tarjetas se actualice eliminando la tarjeta que contiene el elemento
          borrado, por lo tanto esta se destruye antes de mostrar el snackbar.
         */
        setTimeout(() => {
          dispatch(eliminar(evento.id));
        }, 2000);
      } else {
        console.error(data);
        setCargando(false);
        setSnackbar(true);
        setSnackbarMensaje('Algo salió mal');
        setSeveridadDeAlert('error')
      } 
    })
    .catch(error=>{
      console.error(error);
      setCargando(false);
      setSnackbar(true);
      setSnackbarMensaje('Algo salió mal '+error.mensaje);
      setSeveridadDeAlert('error');
    })
  };

  return (
    <Card sx={{ display: 'flex', m: 2 }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cargando}
        onClick={cerrarAnimacion}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <CardMedia
          component="img"
          image={imgUrl}
          alt={`Imagen de categoria ${categoria.tipo}`}
          sx={{ width: 38, height: 38 }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="body1">{categoria.tipo}</Typography>
          <Typography variant="body2">{evento.detalle}</Typography>
          <Typography variant="body2" color="textSecondary">
            {evento.fecha}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Button variant="contained" color="primary" onClick={eliminarEvento}>
          Eliminar
        </Button>
      </Box>
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

    </Card>
  )
}

export default TarjetaEvento;

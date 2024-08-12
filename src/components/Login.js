import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from "../constants/constants";
import { loginExitoso } from "../utils/ManejadorDeLogin";
import { useDispatch } from 'react-redux';
import { loguear } from "../features/logueadoSlice";
import { Snackbar, Alert,  Backdrop, CircularProgress  } from "@mui/material";

const Login = () => {
    const usuario = useRef('');
    const passwd = useRef('');
    const navigate = useNavigate();
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

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            navigate('/');
            dispatch(loguear());
        }
    } ,[]);

    const cerrarAnimacion = () => {
        setCargando(false);
    };
      //reason y clickaway provienen de documentación de MUI
    const cerrarSnackbar = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setSnackbar(false);
    };

    const login = () => {
        setCargando(true);
        const [ user, password ] = [ usuario.current.value, passwd.current.value ];
        if(!validarDatos(user, password)){
            setCargando(false);
            setSnackbar(true);
            setSnackbarMensaje('Por favor, completa los campos');
            setSeveridadDeAlert('error');
            return;
        }

        fetch(API_URL+'login.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: user,
                password: password
            })
        })
        .then((r) => {
            if(r.status === 200 || r.status === 409){
                return r.json();
            }
            return Promise.reject({error: r.status, msj: "Algo salió mal"})
        })
        .then(data => {
            if(data.codigo===409){
                //api retorna 409 cuando los datos son incorrectos
                setCargando(false);
                setSnackbar(true);
                setSnackbarMensaje(data.mensaje);
                setSeveridadDeAlert('error');
                return;
            }
            if(data.codigo===200){
                setCargando(false);
                setSnackbar(true);
                setSnackbarMensaje('Bienvenido!');
                setSeveridadDeAlert('success')
                loginExitoso(data.id, data.apiKey);
                dispatch(loguear());
                //el delay es para evitar que se haga la redirección antes de que se muestre 
                //el snackbar con el mensaje de bienvenida
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setCargando(false);
                setSnackbar(true);
                setSnackbarMensaje('Algo salió mal');
                setSeveridadDeAlert('error') 
            }

        })
        .catch(error => {
            console.error(error);
            setCargando(false);
            setSnackbar(true);
            setSeveridadDeAlert('error');
        });
    };

    const validarDatos = (user, password) => {
        if(user.trim() === '' || password.trim() === '' || user === undefined || password === undefined){
            return false;
        }
        return true;
    };


    return(
        <div className="container-fluid mt-5">
            <div className="row justify-content-center my-3">
                <div className="col-lg-4 col-md-8 col-sm-6">
                    <div className="text-center my-5">
                        <h1>Inicio de sesión</h1>
                    </div>
                    {/* https://getbootstrap.com/docs/5.0/forms/floating-labels/#example */}
                    <div className="form-floating mb-3">
                        <input className="form-control" id="usuario" type="text" ref={usuario} />
                        <label htmlFor="usuario">Usuario</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" id="passwd" type="password" ref={passwd} />
                        <label htmlFor="passwd">Contraseña</label>
                    </div>
                    <div className="text-center">
                        <button className="btn my-2 mx-2" style={{ color: 'white', backgroundColor: '#272727'}} onClick={login}>Ingresar</button>
                        <Link to="/registro" style={{ color: 'white', backgroundColor: '#272727'}} className="btn my-2 mx-2">Registrarse</Link>
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

                </div> 
            </div>
        </div>
    );
}

export default Login;

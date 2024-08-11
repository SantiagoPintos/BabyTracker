import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../constants/constants";
import { loginExitoso } from "../utils/ManejadorDeLogin";
import { useDispatch } from 'react-redux';
import { loguear } from "../features/logueadoSlice";
import { Snackbar, Alert,  Backdrop, CircularProgress  } from "@mui/material";

const Registro = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //para select(s)
    const [ departamentos, setDepartamentos ] = useState([]);
    const [ ciudades, setCiudades ] = useState([]);
    //para fetch de registro
    const usuario = useRef('');
    const passwd = useRef('');
    const [ ciudad, setCiudad ] = useState(undefined);
    const [ departamento, setDepartamento ] = useState(undefined);
    const [ cargando, setCargando ] = useState(false);
    const [ snackbar, setSnackbar ] = useState(false);
    const [ snackbarMensaje, setSnackbarMensaje ] = useState('');
    //se usa para controlar el color del alert que se muestra dentro del snackbar
    //'error': rojo
    //'success': verde
    const [ severidadDeAlert, setSeveridadDeAlert ] = useState(null);
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

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            navigate('/');
        } else {
            fetch(API_URL+'departamentos.php')
            .then(r => r.json())
            .then(data => {
                if(data.codigo === 200){
                    setDepartamentos(data.departamentos);
                } else {
                    Promise.reject({error: data.codigo, msj: "Algo salió mal"});
                }
            })
            .catch(err => {
                console.log(err);
                alert('No se pudieron cargar los departamentos');
            })
        }
    }, []);

    const cargarCiudades = (event) => {
        const idDepartamento = event.target.value;
        //en caso de que usuario seleccione "Seleccione..." no es necesario hacer una petición a la API.
        if(idDepartamento === -1) return;

        fetch(API_URL+'ciudades.php?idDepartamento='+idDepartamento)
        .then(r => r.json())
        .then(data => {
            if(data.codigo === 200){
                setCiudades(data.ciudades);
                guardarDepartamento(idDepartamento);
            } else {
                Promise.reject({error: data.codigo, msj: "Algo salió mal"});
            }
        })
        .catch(err => console.log(err))

    };

    const guardarDepartamento = (id) => {
        setDepartamento(id);
    }

    const guardarCiudad = (event) => {
        const idCiudad = event.target.value;
        setCiudad(idCiudad);
    }

    const validarDatos = (user, password, departamento, ciudad) => {
        if(user.trim() === '' || password.trim() === '' || user === undefined || password === undefined || departamento === undefined || ciudad === undefined){
            return false;
        }
        return true;
    };

    const registrar = () => {
        setCargando(true);
        if(!validarDatos(usuario.current.value, passwd.current.value, departamento, ciudad)){
            setCargando(false);
            setSnackbar(true);
            setSnackbarMensaje('Por favor, completa los campos');
            setSeveridadDeAlert('error');
            return;
        }

        const registro = {
            usuario: usuario.current.value,
            password: passwd.current.value,
            idCiudad: ciudad,
            idDepartamento: departamento
        };
        fetch(API_URL+'usuarios.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registro)
        })
        .then(r => {
            if(r.status === 200 || r.status === 409){
                //409 = ya existe el usuario
                return r.json();
            }
            return Promise.reject({error: r.status, msj: "Algo salió mal"});
        })
        .then(data => {
            console.log(data);
            if(data.codigo === 200){
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
                //api retorna 409 cuando los datos son incorrectos
                setCargando(false);
                setSnackbar(true);
                setSnackbarMensaje(data.mensaje);
                setSeveridadDeAlert('error');
                return;
            }
        })
        .catch(error => {
            setCargando(false);
            setSnackbar(true);
            setSeveridadDeAlert('error');
            console.error(error);
        });
    };

    return(
        <div className="container-fluid">
            <div className="row justify-content-center my-3">
                <div className="col-lg-4 col-md-8 col-sm-6">
                    <h1 className="py-3">Registrarse</h1>
                    <div className="form-floating my-3">
                        <input className="form-control" type="text" id="usuario" ref={usuario} />
                        <label htmlFor="usuario">Usuario</label>
                    </div>
                    <div className="form-floating my-3">
                        <input className="form-control" id="passwd" type="password" ref={passwd} />
                        <label htmlFor="passwd">Contraseña</label>
                    </div>
                    <div className="form-floating my-3">
                        <select className="form-select" id="selectDepto" onChange={cargarCiudades}>
                                <option key={-1} value={-1}>Seleccione...</option>
                            {departamentos.map(departamento => (
                                <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                            ))}
                        </select>
                        <label htmlFor="selectDpto">Departamento</label>
                    </div>
                    <div className="form-floating my-3">
                        <select className="form-select" id="selectCiudad" onChange={guardarCiudad}>
                                <option key={-1} value={-1}>Seleccione...</option>
                            {ciudades.map(ciudad => (
                                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                            ))}
                        </select>
                        <label htmlFor="selectCiudad">Ciudad</label>
                    </div>
                    <div className="text-center">
                        <input className="btn btn-primary my-3" type="button" value="Registrarse" onClick={registrar}/>
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
    )
}

export default Registro;

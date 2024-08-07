import { useRef, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from "../constants/constants";
import { loginExitoso } from "../utils/ManejadorDeLogin";

const Login = () => {
    const usuario = useRef('');
    const passwd = useRef('');
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            navigate('/');
        }
    } ,[]);

    const login = () => {
        const [ user, password ] = [ usuario.current.value, passwd.current.value ];
        if(!validarDatos(user, password)){
            alert('Por favor, completa los campos');
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
                alert(data.mensaje);
            }
            if(data.codigo===200){
                loginExitoso(data.id, data.apiKey);
                alert('Bienvenido');
                navigate('/');
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    const validarDatos = (user, password) => {
        if(user.trim() === '' || password.trim() === '' || user === undefined || password === undefined){
            return false;
        }
        return true;
    };


    return(
        <div className="container-fluid">
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
                        <button className="btn btn-primary my-2 mx-2" onClick={login}>Ingresar</button>
                        <Link to="/registro" className="btn btn-primary my-2 mx-2">Registrarse</Link>
                    </div>

                </div> 
            </div>
        </div>
    );
}

export default Login;

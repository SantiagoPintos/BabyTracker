import { useRef } from "react";
import { API_URL } from "../constants/constants";

const Login = () => {
    const usuario = useRef('');
    const passwd = useRef('');

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
                alert('Bienvenido');
                localStorage.setItem('token', data.apiKey);
                localStorage.setItem('id', data.id);
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
                    <button className="btn btn-primary my-2" onClick={login}>Ingresar</button>
                </div> 
            </div>
        </div>
    );
}

export default Login;

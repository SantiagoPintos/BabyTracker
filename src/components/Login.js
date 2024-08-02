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
                <div className="col-6">
                    <h1>Login</h1>
                    <br />
                    <label className="form-label">
                        Usuario
                        <input className="form-control" type="text" ref={usuario} />
                    </label>
                    <br />
                    <label className="form-label">
                        Contraseña
                        <input className="form-control" type="password" ref={passwd} />
                    </label>
                    <br />
                    <button className="btn btn-primary" onClick={login}>Ingresar</button>
                </div> 
            </div>
        </div>
    );
}

export default Login;
import { useRef } from "react";
import { API_URL } from "../../constants/constants";

const Login = () => {
    const usuario = useRef(undefined);
    const passwd = useRef(undefined);

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
        <div>
            <h1>Login</h1>
            <label>
                Usuario
                <input type="text" ref={usuario} />
            </label>
            <br />
            <label>
                Contraseña
                <input type="password" ref={passwd} />
            </label>
            <br />
            <button onClick={login}>Ingresar</button>
        </div>
    );
}

export default Login;
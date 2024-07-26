import { useRef } from "react";


const Login = () => {
    const usuario = useRef(null);
    const passwd = useRef(null);

    const login = () => {
        console.log('Usuario:', usuario.current.value);
        console.log('Contraseña:', passwd.current.value);
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
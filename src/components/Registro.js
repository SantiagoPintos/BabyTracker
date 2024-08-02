import { useEffect, useState, useRef } from "react";
import { API_URL } from "../constants/constants";

const Registro = () => {
    //para select(s)
    const [ departamentos, setDepartamentos ] = useState([]);
    const [ ciudades, setCiudades ] = useState([]);
    //para fetch de registro
    const usuario = useRef('');
    const passwd = useRef('');
    const [ ciudad, setCiudad ] = useState(undefined);
    const [ departamento, setDepartamento ] = useState(undefined);

    useEffect(() => {
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
        if(!validarDatos(usuario.current.value, passwd.current.value, departamento, ciudad)){
            alert('Por favor, completa los campos');
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
            if(data.codigo === 200){
                alert(data.mensaje);
                localStorage.setItem('token', data.apiKey);
                localStorage.setItem('id', data.id);
            } else {
                alert(data.mensaje);
            }
        })
        .catch(error => {
            alert(error.msj);
            console.error(error);
        });
    };

    return(
        <div>
            <h1>Registro</h1>
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
            <label>Departamento</label>
            <select onChange={cargarCiudades}>
                    <option key={-1} value={-1}>Seleccione...</option>
                {departamentos.map(departamento => (
                    <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                ))}
            </select>
            <br />
            <label>Ciudad</label>
            <select onChange={guardarCiudad}>
                    <option key={-1} value={-1}>Seleccione...</option>
                {ciudades.map(ciudad => (
                    <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                ))}
            </select>
            <br />
            <input type="button" value="Registrarse" onClick={registrar}/>
        </div>
    )
}

export default Registro;

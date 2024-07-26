import { useEffect, useState, useRef } from "react";

const Registro = () => {
    const API_URL = 'https://babytracker.develotion.com/'
    const [ departamentos, setDepartamentos ] = useState([]);
    const [ ciudades, setCiudades ] = useState([]);
    const usuario = useRef(null);
    const passwd = useRef(null);
    const [ user, setUser ] = useState(null);
    const [ pass, setPass ] = useState(null);
    const [ ciudad, setCiudad ] = useState(null);
    const [ departamento, setDepartamento ] = useState(null);

    useEffect(() => {
        fetch(API_URL+'departamentos.php')
        .then(r => r.json())
        .then(data => {
            setDepartamentos(data.departamentos);
        })
        .catch(err => console.log(err))
    }, []);

    const cargarCiudades = (event) => {
        const idDepartamento = event.target.value;
        fetch(API_URL+'ciudades.php?idDepartamento='+idDepartamento)
        .then(r => r.json())
        .then(data => {
            setCiudades(data.ciudades);
        })
        .catch(err => console.log(err))

        guardarDepartamento(idDepartamento);
    };

    const guardarDepartamento = (id) => {
        setDepartamento(id);
    }

    const guardarCiudad = (event) => {
        const idCiudad = event.target.value;
        setCiudad(idCiudad);
    }


    const registrar = () => {
        setUser(usuario.current.value);
        setPass(passwd.current.value);
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
                {departamentos.map(departamento => (
                    <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                ))}
            </select>
            <br />
            <label>Ciudad</label>
            <select onChange={guardarCiudad}>
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

import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../utils/ManejadorDeLogin";
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { desloguear } from "../features/logueadoSlice";

const LogoutBoton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(desloguear());
        alert('Sesión cerrada');
        cerrarSesion();
        navigate('/login');
    };

  return (
    <Button onClick={logOut} color="inherit">Cerrar sesión</Button>
  )
}

export default LogoutBoton

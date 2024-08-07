import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../utils/ManejadorDeLogin";

const LogoutBoton = () => {
    const navigate = useNavigate();

    const logOut = () => {
        alert('Sesión cerrada');
        cerrarSesion();
        navigate('/login');
    };

  return (
    <button onClick={logOut} className="btn btn-danger">Cerrar sesión</button>
  )
}

export default LogoutBoton

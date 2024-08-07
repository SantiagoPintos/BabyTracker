import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/loginSlice";

const LogoutBoton = () => {
    const distpatch = useDispatch();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        alert('Sesión cerrada');
        distpatch(logout());
        navigate('/login');
    };

  return (
    <button onClick={cerrarSesion} className="btn btn-danger">Cerrar sesión</button>
  )
}

export default LogoutBoton

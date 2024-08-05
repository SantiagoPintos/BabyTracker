import { useDispatch } from "react-redux";
import { logout } from "../features/loginSlice";

const LogoutBoton = () => {
    const distpatch = useDispatch();

    const cerrarSesion = () => {
        alert('Sesión cerrada');
        distpatch(logout());
    };

  return (
    <button onClick={cerrarSesion} className="btn btn-danger">Cerrar sesión</button>
  )
}

export default LogoutBoton

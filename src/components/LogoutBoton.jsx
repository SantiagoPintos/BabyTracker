import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../utils/ManejadorDeLogin";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { desloguear } from "../features/logueadoSlice";


const LogoutBoton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const logOut = () => {
        dispatch(desloguear());
        cerrarSesion();
        navigate('/login');
    };

    //botón con estilos personalizados https://mui.com/material-ui/react-button/#customization
    //se hace porque los estilos no se aplican correctamente al hacer hover, y aplicar css
    //sobre el Button tradicional rompe algunos estilos
    const BotonCustom = styled(Button)(({ theme }) => ({
        color: 'white',
        backgroundColor: '#272727',
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#272727',
        },
    }));

  return (
    <BotonCustom onClick={logOut}>Cerrar sesión</BotonCustom>
  )
}

export default LogoutBoton

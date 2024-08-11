import LogoutBoton from "./LogoutBoton"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useEffect, useState }  from 'react';

const Header = () => {
    const estaLogueado = useSelector(state => state.logueado.logueado);
    const [ logueado, setLogueado ] = useState(false);
    useEffect(() => {
        if(estaLogueado){
            setLogueado(true);
        } else {
            setLogueado(false);
        }
    }, [estaLogueado]);

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bienvenido
            </Typography>
            { logueado ? <LogoutBoton /> : null }
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header
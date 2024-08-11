import { Avatar, Paper, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { IMG_API_URL } from '../constants/constants';

//en caso de que no se reciban props, se asigna un array vacío para evitar errores
const TarjetaInformeEventosHoy = ({imagen, elemento = [], nombre=''}) => {
    const [hayEventosHoy, setHayEventosHoy] = useState(false);
    const [tiempoDesdeUltimoEvento, setTiempoDesdeUltimoEvento] = useState('');
    const [cantEventosHoy, setCantEventosHoy] = useState(0);
    const imgUrl = `${IMG_API_URL}${imagen}.png`;

    useEffect(() => {
        const hoy = new Date().toISOString().slice(0, 10);
        //la comparación con == es intencional, porque la fecha viene como string desde api
        const eventosHoy = elemento.filter(evento => evento?.fecha?.slice(0, 10) == hoy);
        const cantidadEventosHoy = eventosHoy.length;

        setCantEventosHoy(cantidadEventosHoy);
        setHayEventosHoy(cantidadEventosHoy > 0);

        if (cantidadEventosHoy > 0) {
            const ultimoEvento = eventosHoy[cantidadEventosHoy - 1];
            if (ultimoEvento && ultimoEvento.fecha) {
                const tiempoDesdeUltimoEventoMs = new Date() - new Date(ultimoEvento.fecha);
                const horas = Math.floor(tiempoDesdeUltimoEventoMs / 3600000).toString().padStart(2, '0');
                const minutos = Math.floor((tiempoDesdeUltimoEventoMs % 3600000) / 60000).toString().padStart(2, '0');
                setTiempoDesdeUltimoEvento(`${horas}:${minutos}`);
            } else {
                setTiempoDesdeUltimoEvento('');
            }
        } else {
            setTiempoDesdeUltimoEvento('');
        }
    }, [elemento]);

    return (
        <Box sx={{m:1}}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar alt={nombre} src={imgUrl} sx={{ width: 38, height: 38, marginRight: 2 }} />
                {hayEventosHoy ? (
                    <Box>
                        <Typography variant="h6">{nombre} hoy: {cantEventosHoy}</Typography>
                        <Typography variant="body1">{tiempoDesdeUltimoEvento} desde el último</Typography>
                    </Box>
                ) : (
                    <Typography variant="body1">No hubo {nombre} hoy</Typography>
                )}
            </Paper>
        </Box>
    );
};

export default TarjetaInformeEventosHoy
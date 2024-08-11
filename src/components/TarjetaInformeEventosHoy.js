import { Avatar, Paper, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { IMG_API_URL } from '../constants/constants';

//en caso de que no se reciban props, se asigna un array vacío para evitar errores
const TarjetaInformeEventosHoy = ({imagen, elemento = [], nombre=''}) => {
    const [hayEventosHoy, setHayEventosHoy] = useState(false);
    const [tiempoDesdeUltimoEvento, setTiempoDesdeUltimoEvento] = useState('');
    const [cantEventosHoy, setCantEventosHoy] = useState(0);
    const imgUrl = `${IMG_API_URL}${imagen}.png`;

    //se hace dentro de useEffect para evitar loop infinito, preguntar por esto
    useEffect(() => {
        const hoy = new Date().toISOString().slice(0, 10);
        //solo se busca coincidencia por fecha, por eso el slice
        const eventosHoy = elemento.filter(evento => evento.fecha.slice(0, 10) === hoy);
        setCantEventosHoy(eventosHoy.length);

        if (cantEventosHoy > 0) {
            setHayEventosHoy(true);
            const ultimoEvento = eventosHoy[eventosHoy.length - 1];
            const tiempoDesdeUltimoEventoMs = new Date() - new Date(ultimoEvento.fecha);
            //ms=>s=>min=>h
            const horas = Math.floor(tiempoDesdeUltimoEventoMs / 3600000).toString().padStart(2, '0');
            const minutos = Math.floor((tiempoDesdeUltimoEventoMs % 3600000) / 60000).toString().padStart(2, '0');
            setTiempoDesdeUltimoEvento(`${horas}:${minutos}`);
        } else {
            setHayEventosHoy(false);
            setTiempoDesdeUltimoEvento('');
        }
    }, [elemento, cantEventosHoy]);

    return (
        <Box>
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
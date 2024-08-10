import { Avatar, Paper, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { IMG_API_URL } from '../constants/constants';

//en caso de que no se reciban props, se asigna un array vacío para evitar errores
const Biberones = ({imagen, elemento = [], nombre=''}) => {
    const [hayBiberonesHoy, setHayBiberonesHoy] = useState(false);
    const [tiempoDesdeUltimoBiberon, setTiempoDesdeUltimoBiberon] = useState('');
    const [cantBiberonesHoy, setCantBiberonesHoy] = useState(0);
    const imgUrl = `${IMG_API_URL}${imagen}.png`;

    //se hace dentro de useEffect para evitar loop infinito, preguntar por esto
    useEffect(() => {
        const hoy = new Date().toISOString().slice(0, 10);
        //solo se busca coincidencia por fecha, por eso el slice
        const biberonesHoy = elemento.filter(biberon => biberon.fecha.slice(0, 10) === hoy);
        setCantBiberonesHoy(biberonesHoy.length);

        if (cantBiberonesHoy > 0) {
            setHayBiberonesHoy(true);
            const ultimoBiberon = biberonesHoy[biberonesHoy.length - 1];
            const tiempoDesdeUltimoBiberonMs = new Date() - new Date(ultimoBiberon.fecha);
            //ms=>s=>min=>h
            const horas = Math.floor(tiempoDesdeUltimoBiberonMs / (1000 * 60 * 60));
            //ms=>s=>min
            const minutos = Math.floor((tiempoDesdeUltimoBiberonMs % (1000 * 60 * 60)) / (1000 * 60));
            setTiempoDesdeUltimoBiberon(`${horas}:${minutos}`);
        } else {
            setHayBiberonesHoy(false);
            setTiempoDesdeUltimoBiberon('');
        }
    }, []);

    return (
        <Box>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar alt={nombre} src={imgUrl} sx={{ width: 38, height: 38, marginRight: 2 }} />
                {hayBiberonesHoy ? (
                    <Box>
                        <Typography variant="h6">{nombre} hoy: {cantBiberonesHoy}</Typography>
                        <Typography variant="body1">Tiempo desde el último: {tiempoDesdeUltimoBiberon}</Typography>
                    </Box>
                ) : (
                    <Typography variant="body1">No hubo {nombre} hoy</Typography>
                )}
            </Paper>
        </Box>
    );
};

export default Biberones
import { Paper, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

//en caso de que no se reciban biberones, se asigna un array vacío para evitar errores
const Biberones = ({ biberones = [] }) => {
    const [hayBiberonesHoy, setHayBiberonesHoy] = useState(false);
    const [tiempoDesdeUltimoBiberon, setTiempoDesdeUltimoBiberon] = useState('');
    const [cantBiberonesHoy, setCantBiberonesHoy] = useState(0);

    //se hace dentro de useEffect para evitar loop infinito, preguntar por esto
    useEffect(() => {
        const hoy = new Date().toISOString().slice(0, 10);
        //solo se busca coincidencia por fecha, por eso el slice
        const biberonesHoy = biberones.filter(biberon => biberon.fecha.slice(0, 10) === hoy);
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
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                {hayBiberonesHoy ? 
                    <Box>
                        <Typography variant="h6">Biberones hoy: {biberones.filter(biberon => biberon.fecha.slice(0, 10) === new Date().toISOString().slice(0, 10)).length}</Typography>
                        <Typography variant="body1">Tiempo desde el último biberón: {tiempoDesdeUltimoBiberon}</Typography>
                    </Box>
                    : 
                    <Typography variant="body1">No hubo biberones hoy</Typography>
                }
            </Paper>
        </Box>
    );
};

export default Biberones
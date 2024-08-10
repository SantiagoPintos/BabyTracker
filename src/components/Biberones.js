import { Paper, Box, Grid } from '@mui/material';

const Biberones = ({biberones}) => {
    const cantBiberonesHoy = biberones.filter(biberon => biberon.fecha.slice(0, 10) === new Date().toISOString().slice(0, 10)).length;
    const ultimoBiberon = biberones[biberones.length - 1];
    const tiempoDesdeUltimoBiberonMs = new Date().getTime() - new Date(ultimoBiberon.fecha).getTime();
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    const tiempoDesdeUltimoBiberon = new Date(tiempoDesdeUltimoBiberonMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <Box>
            <Paper elevation={2} sx={{ p:3 }}>
                <Box sx={{ flexGrow: 1}}>
                    <Box>
                        <p>Biberones hoy: {cantBiberonesHoy}</p>
                    </Box>
                    <Box>
                        <p>{tiempoDesdeUltimoBiberon} hs desde el último biberón</p>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default Biberones
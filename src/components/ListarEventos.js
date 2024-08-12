import { useSelector } from "react-redux";
import { useState } from "react";
import { Paper, Tabs, Tab, Box, Typography } from '@mui/material';
import TarjetaEvento from "./TarjetaEvento";

const ListarEventos = () => {
    const eventos = useSelector(state => state.eventos.eventos);
    const [ pestanaActiva, setPestanaActiva ] = useState('hoy'); 
    const hoy = new Date().toISOString().slice(0, 10);
    const eventosHoy = [];
    const restoEventos = [];
    eventos.forEach(evento => {
        if(evento.fecha.slice(0, 10) === hoy){
            eventosHoy.push(evento);
        } else {
            restoEventos.push(evento);
        }
    });

    //se harcodea la altura para que el componente no desplace las gráficas y genere un espacio en blanco a la izquierda
    //TODO: hacerlo responsive desde el padre
    return (
        <Box sx={{mt:2}}>
            <h4 className="text-center">Lista de eventos</h4>
            <Box sx={{height: '400px', overflowY: 'auto'}}>
                    {/* tabs de colores: https://mui.com/material-ui/react-tabs/#colored-tab*/}
                    <Tabs 
                        value={pestanaActiva} 
                        onChange={(event, newValue) => setPestanaActiva(newValue)}
                        variant="fullWidth"
                        centered
                    >
                        <Tab value="hoy" label="Hoy" />
                        <Tab value="noHoy" label="Resto de eventos" />
                    </Tabs>
                    <Box sx={{py:1}}>
                        {pestanaActiva === 'hoy' && (
                            eventosHoy.length > 0 ? (
                                eventosHoy.map(evento => (
                                    <TarjetaEvento key={evento.id} evento={evento} />
                                ))
                            ) : (
                                <Typography>No hay eventos para mostrar.</Typography>
                            )
                        )}
                        {pestanaActiva === 'noHoy' && (
                            restoEventos.length > 0 ? (
                                restoEventos.map(evento => (
                                    <TarjetaEvento key={evento.id} evento={evento} />
                                ))
                            ) : (
                                <Typography>No hay eventos para mostrar.</Typography>
                            )
                        )}
                    </Box>
            </Box>
        </Box>
    )
}

export default ListarEventos

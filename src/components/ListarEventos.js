import { useSelector } from "react-redux";
import { useState } from "react";
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TarjetaEvento from "./TarjetaEvento";

const ListarEventos = () => {
    const eventos = useSelector(state => state.eventos.eventos);
    const [ pestanaActiva, setPestanaActiva ] = useState('hoy'); 
    const hoy = new Date().toISOString().slice(0, 10);
    const eventosHoy = eventos.filter(evento => {
        const fechaEvento = evento.fecha.slice(0, 10);
        return fechaEvento === hoy;
    });
    const restoEventos = eventos.filter(evento => {
        const fechaEvento = evento.fecha.slice(0, 10);
        return fechaEvento !== hoy;
    });

    return (
        <div>
        <Typography className="text-center" variant="h2">Eventos</Typography>
        <Tabs 
            value={pestanaActiva} 
            onChange={(event, newValue) => setPestanaActiva(newValue)}
            variant="fullWidth"
            centered
        >
            <Tab value="hoy" label="Hoy" />
            <Tab value="noHoy" label="Resto de eventos" />
        </Tabs>
        <Box>
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
    </div>
    )
}

export default ListarEventos

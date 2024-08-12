import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Avatar, Box, Paper, Typography } from "@mui/material";


const TiempoParaProximoBiberon = () => {
    //biberon cat 35
    const eventos = useSelector(state => state.eventos.eventos);
    const [tiempoParaProximoBiberon, setTiempoParaProximoBiberon] = useState(0);
    const [ colorTexto, setColorTexto ] = useState('green');
    useEffect(() => {
        const biberones = eventos.filter(evento => evento.idCategoria == 35);
        if(biberones.length == 0){
            setTiempoParaProximoBiberon('No hay biberones registrados');
            setColorTexto('text-danger');
        } else {
            const ultimoBiberon = biberones[biberones.length - 1];
            const horaUltimoBiberon = new Date(ultimoBiberon.fecha);
            const horaActual = new Date();
            const tiempoTranscurrido = horaActual - horaUltimoBiberon;
            // 4 horas en milisegundos
            const tiempoRestante = 4 * 3600000 - tiempoTranscurrido; 
            //se generó con ia (Claude)
            const horas = Math.floor(tiempoRestante / 3600000).toString().padStart(2, '0');
            const minutos = Math.floor((tiempoRestante % 3600000) / 60000).toString().padStart(2, '0');
            if(tiempoRestante <= 0){
                setTiempoParaProximoBiberon(`Pasaron más de 4 horas desde el último biberón!`);
                setColorTexto('red');
            } else {
                setTiempoParaProximoBiberon(`Faltan ${horas} horas y ${minutos} minutos para el próximo biberón`);
                setColorTexto('green');
            }
        }
    }, [eventos]);


    return (
        <div>
            <h4 className='text-center pb-3'>Información sobre el biberón</h4>
            <Box sx={{mt:1}}>
                <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', minHeight:'75px' }}>
                    <Avatar alt='Imagen de biberón' src='https://babytracker.develotion.com/imgs/5.png' sx={{ width: 38, height: 38, marginRight: 2 }} />
                        <Box>
                            <Typography color={colorTexto} variant="body1">{tiempoParaProximoBiberon}</Typography>
                        </Box>
                </Paper>
            </Box>
        </div>
    );
};

export default TiempoParaProximoBiberon;

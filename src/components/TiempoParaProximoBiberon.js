import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';


const TiempoParaProximoBiberon = () => {
    //biberon cat 35
    const eventos = useSelector(state => state.eventos.eventos);
    const [tiempoParaProximoBiberon, setTiempoParaProximoBiberon] = useState(0);
    const [ colorTexto, setColorTexto ] = useState('text-success');
    useEffect(() => {
        const biberones = eventos.filter(evento => evento.idCategoria === 35);
        if(biberones.length === 0){
            setTiempoParaProximoBiberon('No hay biberones registrados');
            setColorTexto('text-danger');
        } else {
            setTiempoParaProximoBiberon('Hay biberones registrados');
            const ultimoBiberon = biberones[biberones.length - 1];
            const horaUltimoBiberon = new Date(ultimoBiberon.fecha).getTime();
            const horaActual = new Date().getTime();
            const tiempoTranscurrido = horaActual - horaUltimoBiberon;
            //Convertir tiempo a horas y minutos
            //pad start: si número es de un solo dígito se le agregue un 0 adelante
            const horas = Math.floor(tiempoTranscurrido / 3600000).toString().padStart(2, '0');
            const minutos = Math.floor((tiempoTranscurrido % 3600000) / 60000).toString().padStart(2, '0');
            //si pasaron más de 4 horas desde el último biberón el texto debe ser rojo
            if(horas >= 4){
                setColorTexto('text-danger');
            } else {
                setColorTexto('text-success');
            }
            setTiempoParaProximoBiberon(`Han pasado ${horas} horas y ${minutos} minutos desde el último biberón`);
        }
    }, [eventos]);


    return (
        <div>
            <h2>Tiempo para el próximo biberón</h2>
            <p className={colorTexto}>{tiempoParaProximoBiberon}</p>
        </div>
    );
};

export default TiempoParaProximoBiberon;

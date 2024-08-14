import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const ComidasUltimaSemana = () => {
    const eventos = useSelector(state => state.eventos.eventos);
    const [datos, setDatosGrafico] = useState({ labels: [], datasets: [] });
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        // Función para obtener los últimos 7 días incluyendo hoy
        const obtenerUltimos7Dias = () => {
            const dias = [];
            for (let i = 6; i >= 0; i--) {
                const fecha = new Date();
                fecha.setDate(fecha.getDate() - i);
                dias.push(fecha.toISOString().split('T')[0]); // Formato YYYY-MM-DD
            }
            return dias;
        };

        // Obtener los últimos 7 días
        const ultimos7Dias = obtenerUltimos7Dias();

        // Filtrar comidas de los últimos 7 días
        //La fecha proveniente de de la api tiene un espacio entre dia y hora, la que viene del formulario local tiene una T entre la fecha y la hora
        const comidasFiltradas = eventos.filter(evento => 
            evento.idCategoria === 31 && (ultimos7Dias.includes(evento.fecha.split(' ')[0]) || ultimos7Dias.includes(evento.fecha.split('T')[0]))
        );

        // Contar comidas por día
        const conteoComidas = ultimos7Dias.map(dia => 
            comidasFiltradas.filter(comida => comida.fecha.startsWith(dia)).length
        );

        setDatosGrafico({
            labels: ultimos7Dias.map(dia => {
                /*Fecha se construye "a mano" para evitar el siguiente problema:
                ComidasUltimaSemana.js:59 fecha:  Tue Aug 06 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)
                ComidasUltimaSemana.js:57 dia sin filtrar:  2024-08-08
                ComidasUltimaSemana.js:59 fecha:  Wed Aug 07 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)
                ComidasUltimaSemana.js:57 dia sin filtrar:  2024-08-09
                ComidasUltimaSemana.js:59 fecha:  Thu Aug 08 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)
                ComidasUltimaSemana.js:57 dia sin filtrar:  2024-08-10
                ComidasUltimaSemana.js:59 fecha:  Fri Aug 09 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)
                ComidasUltimaSemana.js:57 dia sin filtrar:  2024-08-11
                ComidasUltimaSemana.js:59 fecha:  Sat Aug 10 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)
                ComidasUltimaSemana.js:57 dia sin filtrar:  2024-08-12
                ComidasUltimaSemana.js:59 fecha:  Sun Aug 11 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)
                ComidasUltimaSemana.js:57 dia sin filtrar:  2024-08-13
                ComidasUltimaSemana.js:59 fecha:  Mon Aug 12 2024 21:00:00 GMT-0300 (hora estándar de Uruguay)

                Hay un desface de un día en la fecha al momento de ser mostrada en el gráfico porque cuando se hace new Date()
                se asume que la zona horaria es UTC, no la de uruguay (GMT-3), por lo que se adelanta un día.
                */
                const [year, month, day] = dia.split('-');
                const fecha = new Date(year, month - 1, day);
                //se setea dia de la semana en español y en formato corto para que quede abreviado
                return fecha.toLocaleDateString('es-UY', { weekday: 'short' });
            }),
            datasets: [{
                label: 'Cantidad de comidas',
                data: conteoComidas,
                borderRadius: 3,
                backgroundColor: '#272727',
                borderWidth: 0,
            }]
        });
    }, [eventos]);

    return (
        <div>
            <Bar 
                options={{
                    //desactiva la grilla
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Comidas de la última semana'
                        },
                    },
                }}
                data={datos}
            />
        </div>
    );
}

export default ComidasUltimaSemana;
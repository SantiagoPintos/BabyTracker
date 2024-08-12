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
        const comidasFiltradas = eventos.filter(evento => 
            evento.idCategoria === 31 && ultimos7Dias.includes(evento.fecha.split(' ')[0])
        );

        // Contar comidas por día
        const conteoComidas = ultimos7Dias.map(dia => 
            comidasFiltradas.filter(comida => comida.fecha.startsWith(dia)).length
        );

        setDatosGrafico({
            labels: ultimos7Dias.map(dia => {
                const fecha = new Date(dia);
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
import React, { useEffect, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const GraficoCantidades = () => {
    const categorias = useSelector(state => state.categorias.categorias);
    const eventos = useSelector(state => state.eventos.eventos);
    const [datos, setDatos] = useState({ labels: [], datasets: [] });

    //actualiza el gráfico cada vez que cambian las categorías o los eventos
    useEffect(() => {
        //filtra las categorías que tienen eventos asociados
        const labels = categorias
            //.some verifica si al menos un elemento cumple con la condición
            //en este caso, si algún evento tiene la misma idCategoria que la categoría,
            //si es así, se incluye la categoría en el array,
            //luego se mapea el array de categorías para obtener solo los tipos
            //de las categorías que tienen eventos asociados
            //esto se hace para que el gráfico no muestre categorías sin eventos
            .filter(categoria => eventos.some(evento => evento.idCategoria === categoria.id))
            .map(categoria => categoria.tipo);

        const data = categorias
            .filter(categoria => eventos.some(evento => evento.idCategoria === categoria.id))
            .map(categoria => eventos.filter(evento => evento.idCategoria === categoria.id).length);

        setDatos({
            labels,
            datasets: [{
                backgroundColor: "#272727",
                label: 'Cantidad de eventos',
                borderRadius: 3,
                data,
                borderWidth: 0,
            }]
        });
        //preguntar por esto: si se elimina el array de dependencias, el grafico no se renderiza
    }, [eventos, categorias]);

    return (
        <div>
            <Bar 
                options={{
                    responsive: true,
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
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Eventos por categoría'
                        },
                    },
                }}
                data={datos}
            />
        </div>
    )
}

export default GraficoCantidades;
import React from 'react'
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
  Legend
);

const GraficoCantidades = () => {
    const categorias = useSelector(state => state.categorias.categorias);
    const eventos = useSelector(state => state.eventos.eventos);

    return (
        <div>
            <Bar 
                options={{
                    responsive: true,
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
                data={{
                    labels: categorias.map(categoria => categoria.tipo),
                    datasets: [{
                        backgroundColor: "#9BD0F5",
                        label: 'Cantidad de eventos',
                        data: categorias.map(categoria => eventos.filter(evento => evento.idCategoria === categoria.id).length),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }]
                }}
            />
        </div>
    )
}

export default GraficoCantidades
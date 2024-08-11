import React from 'react'
import GraficoCantidades from './GraficoCantidades'
import ComidasUltimaSemana from './ComidasUltimaSemana'
import TiempoParaProximoBiberon from './TiempoParaProximoBiberon'

const Analisis = () => {
    return (
        <div>
            <GraficoCantidades />
            <ComidasUltimaSemana />
            <TiempoParaProximoBiberon />
        </div>
    )
}

export default Analisis;

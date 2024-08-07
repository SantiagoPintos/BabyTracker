import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Cuerpo = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') === null){
            navigate('/login');
        }
    }, []);
    
    return (
      <div>Cuerpo</div>
    )
}

export default Cuerpo
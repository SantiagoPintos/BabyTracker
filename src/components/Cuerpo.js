import React from 'react'
import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from './Header'

const Cuerpo = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') === null){
            navigate('/login');
        }
    }, []);
    
    return (
      <div>
        <Header />
        Cuerpo
        <Outlet />
      </div>
    )
}

export default Cuerpo
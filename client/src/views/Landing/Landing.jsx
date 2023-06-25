import React from 'react';
import logo from './image/logo.png'


const Landing = () => {

    return (
        <div>
            <img src={logo} alt='logo'/>
            <h1>Comienza el Reto</h1>
            <button>
                Home
            </button>
        </div>
    )
}

export default Landing;
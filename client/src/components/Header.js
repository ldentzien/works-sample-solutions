import React from 'react'
import logo from '../logo-eq.png';
import title from '../logo-works.png';

const Header = () => {
    return(
        <div className="header">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={title} className="App-title" alt="title" />
            <h2>Product Developer Work Sample</h2>
            <h3>Leonardo Dentzien</h3>
            <h4>03/2021</h4>
        </div>
    )
}

export default Header;
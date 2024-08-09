import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../Assets/logo.png';

class Headers extends React.Component {
    render() {
        return(
            <>
                <header className="headerGeral">
                    <div className="logo">
                        <Link to="/home-erp">
                            <img src={ logo } alt="logotipo" />
                        </Link>
                    </div>
                    <div className="nav-bar">
                        <ul>
                            <li><i className="fa-solid fa-right-from-bracket"></i></li>
                            <li><i className="fa-solid fa-gear"></i></li>
                        </ul>
                    </div>
                </header>
            </>
        );
    }
}

export default Headers;
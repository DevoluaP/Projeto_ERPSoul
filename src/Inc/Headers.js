import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';

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
                            <li><FontAwesomeIcon icon={ faRightFromBracket } /></li>
                            <li><FontAwesomeIcon icon={ faGear } /></li>
                        </ul>
                    </div>
                </header>
            </>
        );
    }
}

export default Headers;
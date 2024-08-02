import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/logo.png';
import '../Styles/style-erp.css';

class Headers extends React.Component {
    render() {
        return(
            <div id="page">
                <header>
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
            </div>
        );
    }
}

export default Headers;
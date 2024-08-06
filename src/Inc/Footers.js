import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

class Footers extends React.Component {
    render() {
        return(
            <>
                <footer className="footerGeral">
                    <div className="rodape">
                        <div className="sociais">
                            <div className="social">
                                <a href="www.facebook.com" target="_blank">
                                    <p><FontAwesomeIcon icon={ faFacebook } /></p>
                                </a>
                            </div>
                            <div className="social">
                                <a href="www.instagram.com" target="_blank">
                                    <p><FontAwesomeIcon icon={ faInstagram } /></p>
                                </a>
                            </div>
                            <div className="social">
                                <a href="www.linkedin.com" target="_blank">
                                    <p><FontAwesomeIcon icon={ faLinkedin } /></p>
                                </a>
                            </div>
                        </div>
                        <br />
                        <div className="texto-rodape">
                            <Link to="#"><p>Termos de uso</p></Link>
                            <Link to="#"><p>Política de privacidade</p></Link>
                            <br />
                            <p>© 2024, Right Solution, All Rights Reserved</p>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default Footers;
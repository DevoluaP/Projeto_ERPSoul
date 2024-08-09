import React from 'react';
import { Link } from 'react-router-dom';

class Footers extends React.Component {
    render() {
        return (
            <>
                <footer className="footerGeral">
                    <div className="rodape">
                        <div className="sociais">
                            <div className="social">
                                <a href="www.facebook.com" target="_blank">
                                    <p><i className="fa-brands fa-facebook"></i></p>
                                </a>
                            </div>
                            <div className="social">
                                <a href="www.instagram.com" target="_blank">
                                    <p><i className="fa-brands fa-instagram"></i></p>
                                </a>
                            </div>
                            <div className="social">
                                <a href="www.linkedin.com" target="_blank">
                                    <p><i className="fa-brands fa-linkedin"></i></p>
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
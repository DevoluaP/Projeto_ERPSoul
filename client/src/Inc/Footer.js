import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer>
          <div className="rodape">
            <div className="sociais">
              <div className="social">
                <Link to="#" aria-label="Facebook">
                  <i className="fa-brands fa-facebook" />
                </Link>
              </div>
              <div className="social">
                <Link to="#" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </div>
              <div className="social">
                <Link to="#" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin" />
                </Link>
              </div>
            </div>
            <div className="texto-rodape">
              <div className="links-footer">
                <Link to="#">
                  <p>Termos de uso</p>
                </Link>
                <Link to="#">
                  <p>Política de privacidade</p>
                </Link>
              </div>
              <div className="divider" />
              <p>© 2026 ERP Soul, Inc</p>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;

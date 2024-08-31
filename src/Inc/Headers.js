import React from "react";
import { Link } from "react-router-dom";

import logo from "../Assets/logo.png";

class Headers extends React.Component {
    render() {
        const styles = {
            headerGeral: {
                width: "100%",
                height: "125px",
                display: "flex",
                alignItems: "center",
                position: "relative",
                backgroundColor: "var(--bc)"
            },

            logo: {
                left: "50%",
                position: "absolute",
                transform: "translateX(-50%)"
            },

            navBar: { marginLeft: "auto" },

            navBarUl: {
                display: "flex",
                listStyle: "none",
                color: "var(--fc-paragraphs)",
                fontSize: "var(--fs-paragraphs)"
            },

            navBarUlLi: {
                paddingLeft: "10px",
                cursor: "pointer",
                zIndex: 10
            }
        }

        return(
            <>
                <header style={ styles.headerGeral }>
                    <div style={ styles.logo }>
                        <Link to="/home-erp">
                            <img src={ logo } alt="logotipo" title="ERP - SOUL" />
                        </Link>
                    </div>
                    <div style={ styles.navBar }>
                        <ul style={ styles.navBarUl }>
                            <li style={ styles.navBarUlLi }>
                                <i className="fa-solid fa-right-from-bracket" title="Desconectar"></i>
                            </li>
                            <li style={ styles.navBarUlLi }>
                                <i className="fa-solid fa-gear" title="Configurações"></i>
                            </li>
                        </ul>
                    </div>
                </header>
            </>
        );
    }
}

export default Headers;
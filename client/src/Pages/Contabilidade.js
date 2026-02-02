import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../Inc/Header.js";
import carrinho from "../Assets/carrinho.png";
import CadastrarConta from "../Modals/Cadastrar-conta.js";
import ContasCadastradas from "../Modals/Contas-cadastradas.js";
import BaixarContas from "../Modals/Baixar-contas.js";
import GerarNF from "../Modals/Gerar-nota-fiscal.js";
import ajuda from "../Assets/ajuda.png";
import Footer from "../Inc/Footer.js";
import "../Styles/Geral.css";

export default function Contabilidade() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/private-route", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          Swal.fire({
            title: "Sessão expirou!",
            text: "Faça o login novamente.",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
          navigate("/", { state: { showLoginModal: true } });
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
      }
    };

    fetchUserData();
    AOS.init();
  }, [navigate]);

  const setCloseModal = () => {
    document
      .getElementsByClassName("modal-overlay")[0]
      .classList.add("zoom-out");

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      setOpenModal(false);
      setOpenModal2(false);
      setOpenModal3(false);
      setOpenModal4(false);
      document
        .getElementsByClassName("modal-overlay")[0]
        .classList.remove("zoom-out");
    }, 300);
  };

  return (
    <>
      <body className="body-geral">
        <div className="page-geral" id="page">
          <Header />
          <main className="interna">
            <div className="carrinho">
              <p className="txt-carrinho-geral" data-aos="fade-right">
                <b>Comece a vender mais.</b>
              </p>
              <img src={carrinho} alt="Carrinho" />
              <p className="txt-carrinho-geral" data-aos="fade-left">
                Plataforma que te impulsiona.
              </p>
            </div>
            <hr />
            <div className="central">
              <h1>CONTABILIDADE</h1>
              <div className="container-modal">
                <button
                  className="modal-btn"
                  onClick={() => setOpenModal(true)}
                  id="btn-modal"
                >
                  CADASTRAR CONTA
                </button>
                <button
                  className="modal-btn"
                  onClick={() => setOpenModal2(true)}
                  id="btn-modal"
                >
                  CONTAS CADASTRADAS
                </button>
                <button
                  className="modal-btn"
                  onClick={() => setOpenModal3(true)}
                  id="btn-modal"
                >
                  BAIXAR CONTAS
                </button>
                <button
                  className="modal-btn"
                  onClick={() => setOpenModal4(true)}
                  id="btn-modal"
                >
                  GERAR NF
                </button>
              </div>
              {openModal && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <CadastrarConta
                      isOpenCadastrarConta={openModal}
                      setCloseModal={setCloseModal}
                    />
                    <div className="botoes">
                      <button className="close-btn" onClick={setCloseModal}>
                        <i class="fa-solid fa-xmark" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {openModal2 && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <ContasCadastradas
                      isOpenContasCadastradas={openModal2}
                      setCloseModal={setCloseModal}
                    />
                    <div className="botoes">
                      <button className="close-btn" onClick={setCloseModal}>
                        <i class="fa-solid fa-xmark" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {openModal3 && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <BaixarContas
                      isOpenBaixarContas={openModal3}
                      setCloseModal={setCloseModal}
                    />
                    <div className="botoes">
                      <button className="close-btn" onClick={setCloseModal}>
                        <i class="fa-solid fa-xmark" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {openModal4 && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <GerarNF
                      isOpenGerarNF={openModal4}
                      setCloseModal={setCloseModal}
                    />
                    <div className="botoes">
                      <button className="close-btn" onClick={setCloseModal}>
                        <i class="fa-solid fa-xmark" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <hr />
              <div className="ajuda">
                <p className="txt-ajuda-geral" data-aos="fade-right">
                  Precisa de ajuda?{" "}
                  <b>
                    <Link to="#">Clique aqui.</Link>
                  </b>
                </p>
                <img src={ajuda} alt="Imagem de ajuda" />
                <p className="txt-ajuda-geral" data-aos="fade-left">
                  A Soul está aqui para te ajudar.
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </>
  );
}

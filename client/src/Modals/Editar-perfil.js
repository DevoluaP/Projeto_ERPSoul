import { useState } from "react";
import Swal from "sweetalert2";

export default function EditarPerfil({ user, onClose, onUpdate }) {
  const [nome, setNome] = useState(user?.nome || "");
  const [email] = useState(user?.email || "");
  const [previewImage, setPreviewImage] = useState(user?.foto || null);
  const [imageFile, setImageFile] = useState(null);
  const [removeFoto, setRemoveFoto] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 5MB!");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Apenas imagens são permitidas!");
        return;
      }
      setError("");
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setImageFile(null);
    setRemoveFoto(true);
  };

  const handleSubmit = async () => {
    if (!nome.trim()) {
      setError("O nome não pode ficar vazio!");
      return;
    }

    if (nome.length > 50) {
      setError("O nome deve ter no máximo 50 caracteres!");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("nome", nome.trim());

    if (removeFoto) {
      formData.append("removeFoto", "true");
    }

    if (imageFile) {
      formData.append("foto", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/user/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Perfil atualizado com sucesso!",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        if (onUpdate) onUpdate(data.user);
        if (onClose) onClose();
      } else {
        setError(data.mensagem || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao atualizar perfil");
    }
  };

  return (
    <div className="modal-overlay-home">
      <div className="modal-container-home">
        <div className="modal-header-home">
          <h2>Editar Perfil</h2>
          <button onClick={onClose} className="btn-close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          <div className="foto-section">
            <div className="foto-container">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="foto-preview"
                />
              ) : (
                <div className="foto-placeholder">
                  <i className="fa-regular fa-user" />
                </div>
              )}
              <label htmlFor="foto" className="btn-camera">
                <i className="fa-solid fa-camera" />
              </label>
              <input
                type="file"
                id="foto"
                accept="image/*"
                onChange={handleImageChange}
                className="input-file"
              />
            </div>
            {previewImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="btn-remover-foto"
              >
                Remover foto
              </button>
            )}
            <p className="foto-info">
              Formatos aceitos: JPG, PNG, JPEG (máx. 5MB)
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="nome" className="label-home">
              Nome*
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={50}
              className="input"
              placeholder="Digite seu nome"
            />
            <p className="caracteres-count">
              {nome.length}/50 caracteres
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="email" className="label-home">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="input input-disabled"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="btn-salvar">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

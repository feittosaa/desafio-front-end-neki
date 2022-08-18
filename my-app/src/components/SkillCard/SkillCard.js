import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import ModalDelete from "../ModalDelete/ModalDelete";
import "./SkillCard.css";

function SkillCard({ imageUrl, name, description, version, id }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    function deletar(e) {
        e.preventDefault();
        API.delete(`/api/skills/${id}`)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
        handleClose()
        navigate({ replace: true });
        window.location.reload();
    }

    return (
        <div>
            <div>
                <div className="skillCardContainer" onClick={() => handleShow()} title="Clique para Deletar">
                    <img src={imageUrl} className="skillImg" alt={name} />
                    <h5 className="skillCardDesc">{description}</h5>
                    <h4 className="skillCardName">{name}</h4>
                    <h6 className="skillCardVersion">{id}</h6>
                    <h6 className="skillCardVersion">{version}</h6>
                </div>
                <ModalDelete acao={(e) => deletar(e)} show={show} handleClose={handleClose} title={`DELETAR SKILL ?`}
                    texto={`Você tem certeza que deseja deletar a skill?`} />
            </div>
        </div>
    );
}

export default SkillCard;

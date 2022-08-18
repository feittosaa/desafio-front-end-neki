import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import ModalDelete from "../ModalDelete/ModalDelete";
import "./MySkillCard.css";

function MySkillCard({ skill, knowledgeLevel, id }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    function deletar(e) {
        e.preventDefault();
        API.delete(`/api/userSkills/${id}`)
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
            <div className="mySkillContainer" onClick={() => handleShow()} title="Clique para Remover">
                <h5 className="mySkillName">{skill}</h5>
                <h4 className="mySkillRate">{knowledgeLevel}</h4>
            </div>
            <ModalDelete acao={(e) => deletar(e)} show={show} handleClose={handleClose} title={`REMOVER SKILL DA SUA LISTA?`}
                texto={`Você tem certeza que deseja remover a skill da sua lista?`} />
        </div>
    );
}

export default MySkillCard;

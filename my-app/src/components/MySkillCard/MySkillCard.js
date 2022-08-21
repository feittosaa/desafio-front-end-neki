import { Input } from "@material-ui/core";
import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import ModalDelete from "../ModalDelete/ModalDelete";
import "./MySkillCard.css";

function MySkillCard({ skill, knowledgeLevel, setKnowledgeLevel }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    function deletar(e) {
        e.preventDefault();
        API.delete(`/api/userSkills/${skill}`)
            .then(response => {
                console.log(response.data)
                navigate({ replace: true });
                window.location.reload();
            })
            .catch(error => console.log(error))
        handleClose()
    }


    const update = () => {
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    function alterar(e) {
        e.preventDefault();
        API.put(`/api/userSkills/${skill}`, {
            knowledgeLevel: knowledgeLevel,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        )
            .then(response => {
                console.log(response.data)
                update()
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="mySkillContainer" onClick={() => handleShow()} title="Clique para Remover">
                <h5 className="mySkillName">{skill}</h5>
            </div>
            <ModalDelete acao={(e) => deletar(e)} show={show} handleClose={handleClose} title={`REMOVER SKILL DA SUA LISTA?`}
                texto={`Você tem certeza que deseja remover a skill da sua lista?`} />
            <div className="myRateContainer" title="Clique para Alterar">
                <h4 className="mySkillRate">{knowledgeLevel}</h4>
                <Input
                    placeholder="Nivel:"
                    className="putRate"
                    type="text"
                    onChange={(e) => setKnowledgeLevel(e.target.value)}
                    onSubmit={(e) => setKnowledgeLevel(e.target.value) && alterar()}
                />
            </div>
        </div>
    );
}

export default MySkillCard;

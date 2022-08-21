import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import API from "../../API";
import cancel from "../../assets/cancelar.png";
import save from "../../assets/salvar.png";
import "./ModalMySkillAdd.css";

export default function ModalSkillAdd({ show, handleClose }) {

    const [skill, setSkill] = useState();
    const [knowledgeLevel, setKnowledgeLevel] = useState();


    var navigate = useNavigate();

    const validationPost = yup.object({
        skill: yup.string().required("Campo obrigatório !"),
        knowledgeLevel: yup.string().required("Campo obrigatório !"),
    }).required();

    const update = () => {
        handleClose()
        navigate({ replace: true });
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationPost),
    });

    function createMySkill(e) {
        e.preventDefault();
        API.post(`/api/userSkills`, {
            skill: skill,
            knowledgeLevel: knowledgeLevel
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
            .catch(function (error) {
                if (error.response.status === 400) {
                    alert('Informações inválidas!');
                } else if (error.response.status === 500) {
                    alert('Erro interno de servidor!');
                }
            });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body className='modalBody'>
                <Form onSubmit={handleSubmit(createMySkill)}>
                    <div>
                        <div className="titulo"><b>Skill*</b></div>
                        <input
                            {...register("name")}
                            placeholder="Skill"
                            className="inputNome"
                            onChange={(e) => setSkill(e.target.value)}
                            type="text"
                        />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>
                    <div className="styleDiv">
                        <div className="titulo"><b>Nivel de Conhecimento*</b></div>
                        <input
                            {...register("knowledgeLevel")}
                            type="text"
                            placeholder="Nivel de Conhecimento"
                            onChange={(e) => setKnowledgeLevel(e.target.value)}
                        />
                        <p className="error-message">{errors.description?.message}</p>
                    </div>
                    <Modal.Footer className="ModalFooter">
                        <div className="botaoCriar botoesModal">
                            <button className='stylesButton' type="submit" onClick={(e) => createMySkill(e)}>
                                <img className="salvar" src={save} alt="create" />
                                Criar
                            </button>
                        </div>
                    </Modal.Footer>
                </Form>
                <div className="botaoCancelar botoesModal">
                    <button className='stylesButton2' onClick={handleClose}  >
                        <img className="salvar" src={cancel} alt="cancel" />
                        Cancelar
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
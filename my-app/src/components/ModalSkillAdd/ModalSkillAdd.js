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
import "./ModalSkillAdd.css";

export default function ModalSkillAdd({ show, handleClose }) {

    const [name, setName] = useState();
    const [version, setVersion] = useState();
    const [description, setDescription] = useState();
    const [imageUrl, setImageUrl] = useState();

    var navigate = useNavigate();

    const validationPost = yup.object({
        name: yup.string().required("Campo obrigatório !"),
        imageUrl: yup.string().required("Campo obrigatório !"),
        description: yup.string().required("Campo obrigatório !"),
        version: yup.string(),
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

    function createSkill(e) {
        e.preventDefault();
        API.post(`/api/skills`, {
            name: name,
            version: version,
            description: description,
            imageUrl: imageUrl,
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
                <Form onSubmit={handleSubmit(createSkill)}>
                    <div>
                        <div className="titulo"><b>Nome*</b></div>
                        <input
                            {...register("name")}
                            placeholder="Nome"
                            className="inputNome"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>
                    <div className="styleDiv">
                        <div className="titulo"><b>Descricao*</b></div>
                        <input
                            {...register("description")}
                            type="text"
                            placeholder="Descricao"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className="error-message">{errors.description?.message}</p>
                    </div>
                    <div className="styleDiv">
                        <div className="titulo"><b>Versão</b></div>
                        <input
                            {...register("version")}
                            type="text"
                            placeholder="Versão"
                            onChange={(e) => setVersion(e.target.value)}
                        />
                        <p className="error-message">{errors.version?.message}</p>
                    </div>
                    <div>
                        <div className="styleDiv">
                            <div className="titulo"><b>Imagem*</b></div>
                            <input
                                {...register("imageUrl")}
                                type="text"
                                placeholder="Url da Imagem"
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <p className="error-message">{errors.imageUrl?.message}</p>
                        </div>
                    </div>
                    <Modal.Footer className="ModalFooter">
                        <div className="botaoCriar botoesModal">
                            <button className='stylesButton' type="submit" onClick={(e) => createSkill(e)}>
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
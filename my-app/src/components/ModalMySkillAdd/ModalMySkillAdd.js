import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import API from "../../API";
import cancel from "../../assets/cancelar.png";
import save from "../../assets/salvar.png";
import "./ModalMySkillAdd.css";

export default function ModalMySkillAdd({ show, handleClose }) {

    var navigate = useNavigate();

    const validationPost = yup.object({
        id: yup.string().required("Campo obrigatório !"),
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

    const createSkill = (dados, e) => {
        e.preventDefault();
        var data = new FormData();

        const myJSON = new Blob(
            [
                JSON.stringify({
                    knowledgeLevel: dados.knowledgeLevel,
                    skill: dados.skill,
                }),
            ],
            {
                type: "application/json",
            }
        );

        data.append("skills", myJSON, { contentType: "application/json" });

        var config = {
            method: "post",
            url: `/api/skills`,
            data: data,
        };

        API(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                alert("Skill cadastrada com sucesso");
                update();
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
                        <div className="titulo"><b>Skill*</b></div>
                        <input
                            {...register("skill")}
                            placeholder="Skill"
                            className="inputNome"
                            type="text"
                        />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>
                    <div className="styleDiv">
                        <div className="titulo"><b>Nivel de Conhecimento</b></div>
                        <input
                            {...register("knowledgeLevel")}
                            type="text"
                            placeholder="Nivel de Conhecimento"
                        />
                        <p className="error-message">{errors.version?.message}</p>
                    </div>
                    <Modal.Footer className="ModalFooter">
                        <div className="botaoCriar botoesModal">
                            <button className='stylesButton' type="submit">
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
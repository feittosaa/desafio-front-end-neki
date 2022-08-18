import { Modal, Button } from 'react-bootstrap'
import salvar from "../../assets/salvar.png";
import cancelar from "../../assets/cancelar.png";
import "./ModalDelete.css"

function ModalDelete({ show, handleClose, title, texto, acao }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <b style={{ fontSize: 17, padding: 25 }}>{texto}</b>
            <Modal.Footer>
                <div>
                    <button className='stylesButton botoesModalDelete' onClick={(e) => acao(e)}>
                        <img className="salvar" src={salvar} alt="deletar" />
                        Confirmar
                    </button>
                </div>
                <div >
                    <button className='stylesButton2 botoesModalDelete' onClick={handleClose}>
                        <img className="salvar" src={cancelar} alt="cancelar" />
                        Cancelar
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete
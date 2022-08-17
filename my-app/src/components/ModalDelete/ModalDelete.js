import { Modal, Button } from 'react-bootstrap'
import salvar from "../../assets/salvar.png";
import cancelar from "../../assets/cancelar.png";

function ModalDelete({ show, handleClose, title, texto, acao }) {
    return (
        <Modal style={{ marginTop: "9rem" }} show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <b style={{ fontSize: 17, padding: 25 }}>{texto}</b>
            <Modal.Footer>
                <div>
                    <button
                        className='stylesButton adicionar'
                        onClick={(e) => acao(e)}
                    ><img className="salvar" src={salvar} alt="neki" />
                        Confirmar
                    </button>
                </div>
                <div >
                    <button className='stylesButton2 adicionar' onClick={handleClose}>
                        <img className="salvar" src={cancelar} alt="neki" />
                        Cancelar
                    </button>
                </div>
            </Modal.Footer>

        </Modal>
    )
}

export default ModalDelete
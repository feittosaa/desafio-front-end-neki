import { useState } from "react";
import plus from "../../assets/plus.png";
import user from "../../assets/user.png";
import ModalMySkillAdd from "../../components/ModalMySkillAdd/ModalMySkillAdd";
import "./MySkillsAdd.css";

function MySkillsAdd() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="col-lg-1 col-md-1 col-sm-1 mySkill">
                <div className="mySkillContainerAdd" onClick={() => handleShow()}>
                    <img className="mySkillAdd" src={plus} alt="plus" width="60px" />
                    <h4 className="mySkillRateAdd">adicionar skill a sua lista</h4>
                </div>
                <ModalMySkillAdd show={show} handleClose={handleClose} />
            </div>
        </>
    );
}

export default MySkillsAdd;

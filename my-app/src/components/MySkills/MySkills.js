import { useEffect, useState } from "react";
import API from "../../API";
import MySkillCard from "../../components/MySkillCard/MySkillCard";
import ModalMySkillAdd from "../ModalMySkillAdd/ModalMySkillAdd";
import "./MySkills.css";

function MySkills() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mySkill, setMySkill] = useState([]);

    useEffect(() => {
        const catchData = async () => {
            await API.get("/api/userSkills").then((response) => setMySkill(response.data))
                .catch((error) => {
                    console.error("ocorreu um erro" + error);
                });
        };
        catchData();
    }, []);

    const arrayMySkill = mySkill;

    return (
        <div className="col-lg-1 col-md-1 col-sm-1 mySkill">
            <div>
                <ModalMySkillAdd show={show} handleClose={handleClose} />
                {arrayMySkill
                    .map((t, index) => {
                        return (
                            <div key={index}>
                                <MySkillCard
                                    skill={t.skill}
                                    knowledgeLevel={`Nível de conhecimento: ${t.knowledgeLevel}`}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

export default MySkills

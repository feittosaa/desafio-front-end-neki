import Header from "../../components/Header/Header";
import user from "../../assets/user.png"
import "./Home.css"
import SkillCard from "../../components/SkillCard/SkillCard";
import MySkillCard from "../../components/MySkillCard/MySkillCard";
import plus from "../../assets/plus.png"
import API from "../../API";
import { useEffect, useState } from "react";
import ModalSkillAdd from "../../components/ModalSkillAdd/ModalSkillAdd";

function Home() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mySkill, setMySkill] = useState([]);
    const [skill, setSkill] = useState([]);

    useEffect(() => {
        const catchData = async () => {
            await API.get("/api/userSkills").then((response) => setMySkill(response.data))
                .catch((error) => {
                    console.error("ocorreu um erro" + error);
                });
        };
        catchData();
    }, []);

    useEffect(() => {
        const catchData = async () => {
            await API.get("/api/skills").then((response) => setSkill(response.data))
                .catch((error) => {
                    console.error("ocorreu um erro" + error);
                });
        };
        catchData();
    }, []);

    const arrayMySkill = mySkill;
    const arraySkill = skill;

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <img src={user} className="user" />
                    <div className="col-lg-1 col-md-1 col-sm-1 mySkill">
                        <div className="mySkillContainerAdd">
                            <img className="mySkillAdd" src={plus} alt="plus" width="60px" />
                            <h4 className="mySkillRateAdd">adicionar skill a sua lista</h4>
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 mySkill">
                        <MySkillCard skill="teste" knowledgeLevel="Nível de conhecimento: 4" />
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 mySkill">
                        <div>
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
                </div>
            </div>
            <div className="line"></div>

            <div className="Skills">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2">
                            <div className="skillCardContainerAdd" onClick={() => handleShow()}>
                                <img src={plus} className="skillImgAdd" alt="add" width="60px" />
                                <h4 className="skillCardName">criar nova skill</h4>
                            </div>
                        </div>
                        <ModalSkillAdd show={show} handleClose={handleClose} />
                        {arraySkill
                            .map((t, index) => {
                                return (
                                    <div className="col-lg-2 col-md-2 col-sm-2">
                                        <div key={index}>
                                            <SkillCard
                                                imageUrl={t.imageUrl}
                                                description={t.description}
                                                name={t.name}
                                                version={`versão: ${t.version}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

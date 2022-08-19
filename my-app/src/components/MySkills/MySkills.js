import { useEffect, useState } from "react";
import API from "../../API";
import MySkillCard from "../../components/MySkillCard/MySkillCard";
import "./MySkills.css";

function MySkills() {

    const [mySkill, setMySkill] = useState([]);
    const [skill, setSkill] = useState([]);
    const [knowledgeLevel, setKnowledgeLevel] = useState()

    const update = () => {
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    useEffect(() => {
        const catchData = async () => {
            await API.get("/api/userSkills").then((response) => setMySkill(response.data))
                .catch((error) => {
                    console.error("ocorreu um erro" + error);
                });
        };
        catchData();
    }, []);

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

    const arrayMySkill = mySkill;

    return (
        <>
            {arrayMySkill
                .map((t, index) => {
                    return (
                        <div className="col-lg-1 col-md-1 col-sm-1 mySkill">
                            <div key={index} >
                                <MySkillCard
                                    skill={t.skill}
                                    knowledgeLevel={`Nível de conhecimento: ${t.knowledgeLevel}`}
                                />
                            </div>
                        </div>
                    );
                })}
        </>
    )
}

export default MySkills

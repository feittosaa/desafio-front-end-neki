import "./MySkillCard.css"

function MySkillCard({ skill, knowledgeLevel }) {
    return (
        <div>
            <div className="mySkillContainer">
                <h5 className="mySkillName">{skill}</h5>
                <h4 className="mySkillRate">{knowledgeLevel}</h4>
            </div>
        </div>
    );
}

export default MySkillCard;

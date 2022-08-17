import "./SkillCard.css"

function SkillCard(skillImg, skillName, skillDesc, skillVersion) {
    return (
        <div>
            <div>
                <img src={skillImg} className="skillImg" alt={skillName} />
                <h5>{skillDesc}</h5>
                <h6>{skillVersion}</h6>
            </div>
            <h4>{skillName}</h4>
        </div>
    );
}

export default SkillCard;

import "./MySkillCard.css"

function MySkillCard(mySkillName, mySkillRate) {
    return (
        <div>
            <div>
                <h5>{mySkillName}</h5>
            </div>
            <h4>{mySkillRate}</h4>
        </div>
    );
}

export default MySkillCard;

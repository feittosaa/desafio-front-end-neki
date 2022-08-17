import Header from "../../components/Header/Header";
import user from "../../assets/user.png"
import "./Home.css"
import SkillCard from "../../components/SkillCard/SkillCard";
import MySkillCard from "../../components/MySkillCard/MySkillCard";

function Home(imagem, skillImg, skillName, skillDesc, skillVersion, mySkillName, mySkillRate) {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <img src={user} className="user" />
                    <div className="col-lg-1 col-md-1 col-sm-1">
                        {/* <MySkillCard mySkillName="teste" mySkillRate="5" /> */}
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        {/* <SkillCard skillDesc="aaaaaaaaaaa" skillName="test" skillVersion="1" /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

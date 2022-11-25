import "./style.css"
import { BsHeartFill, BsGithub, BsTwitter, BsLinkedin   } from "react-icons/bs"
const Footer = ({mode}) => {
    return (
        <div className="footer" style={ mode ? {backgroundColor: "rgb(36,98,169)", color: "white"} : {} }>
            <div>
                <h4 className="text">Made By <BsHeartFill color="red" /> Zehan Khan</h4>
            </div>
            <div className="icons">
                <BsGithub size={30} className="bg-git" />
                <BsTwitter size={30} color="#1D9BF0" />
                <BsLinkedin size={30} className="bg-ind"  color="#0A66C2"  />
            </div>
            {/* <p class="love">Made By <BsHeartFill color="red" /> Zehan Khan</p>
            <div style={{display:"flex"}}>
                <div>github</div>
                <div>twitter</div>
                <div>Linkedin</div>
            </div> */}
        </div>
    )
}

export default Footer;
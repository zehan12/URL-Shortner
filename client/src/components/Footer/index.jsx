import "./style.css"
import { BsHeartFill } from "react-icons/bs"
const Footer = ({mode}) => {
    return (
        <div className="footer" style={ mode ? {backgroundColor: "rgb(36,98,169)", color: "white"} : {} }>
            <p class="love">Made By <BsHeartFill color="red" /> Zehan Khan</p>
            <div style={{display:"flex"}}>
                <div>github</div>
                <div>twitter</div>
                <div>Linkedin</div>
            </div>
        </div>
    )
}

export default Footer;
import "./style.css"
import { BsHeartFill, BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer = ({ mode }) => {
    return (
        <div className="footer" style={mode ? { backgroundColor: "rgb(36,98,169)", color: "white" } : {}}>
            <div>
                <h4 className="text">Made By <BsHeartFill color="red" />
                    <a  style={{textDecoration:"none", color:"black",marginLeft:"10px"}}
                        href={"https://drive.google.com/file/d/1BQ_Ys0DlxU2XtawiGYR7WWrZC6dNXz_b/view"} target="_blank" rel="noreferrer">

                        Zehan Khan</a> </h4>
            </div>
            <div className="icons">
                <a
                    href={"https://github.com/zehan12"} target="_blank" rel="noreferrer">
                    <BsGithub size={30} className="bg-git" />
                </a>
                <a
                    href={"https://twitter.com/zehan9211"} target="_blank" rel="noreferrer">
                    <BsTwitter size={30} color="#1D9BF0" /></a>
                <a
                    href={"https://www.linkedin.com/in/zehan-khan-6001a4144/"} target="_blank" rel="noreferrer">
                    <BsLinkedin size={30} className="bg-ind" color="#0A66C2" />
                </a>
            </div>
        </div>
    )
}

export default Footer;
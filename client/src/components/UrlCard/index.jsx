import QRCode from "qrcode.react";
import { FaRegCopy } from "react-icons/fa";
import { RiNavigationFill } from "react-icons/ri";
import "./style.css"

const UrlCard = ({ originalUrl, shortUrl }) => {
    return (
        <div className="card">
            <div className="card-text"> URL CREATED</div>
            <div className="card-flex">
                <QRCode value={originalUrl} />
                <div className="card-col">
                    <div className="card-btn">Short URL</div>
                    <p>{shortUrl}</p>
                    <div className="card-icon">
                        <FaRegCopy style={{ cursor: "pointer" }} onClick={() => navigator.clipboard.writeText({shortUrl})} />
                        <a href={originalUrl} target="_blank" rel="noreferrer">
                            <RiNavigationFill style={{ cursor: "pointer" }} />
                        </a>
                    </div>
                    <div className="card-btn2">Original URL</div>
                    <p>{originalUrl}</p>
                </div>
            </div>
        </div>

    )
}

export default UrlCard;
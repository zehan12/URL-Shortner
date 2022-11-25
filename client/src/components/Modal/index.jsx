import React from "react";
import "./style.css";
import QRCode from "qrcode.react";
import { FaRegCopy } from "react-icons/fa";
import {ImCross} from "react-icons/im"


function Modal({ setOpenModal, url }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <ImCross fill="#8b0000" />
          </button> 
        </div>
        <div className="title">
          <h1>URL</h1>
          <QRCode
            value={url.originalUrl} style={{ marginRight: 0 }} />
        </div>
      
        <div className="body">
  
          <p>{url.shortUrl}</p>
        </div>
        <div className="down">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button><FaRegCopy /></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
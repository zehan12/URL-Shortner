import React from "react";
import "./style.css";
import QRCode from "qrcode.react";


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
            X
          </button>
        </div>
        <div className="title">
          <h1>URL</h1>
          <QRCode
            value={url.originalUrl} style={{ marginRight: 0 }} />
        </div>
      
        <div className="body">
  
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
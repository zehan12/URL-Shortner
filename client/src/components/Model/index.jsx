import React, { Fragment } from "react";
import "./style.css";

export default function Modal({ onClose, show, children }) {
    const handleClose = e => {
        onClose && onClose();
    }
    if (!show) {
        return <h1>No</h1>
    }
        return (
            <Fragment>
                < div class="modal" id="modal" >
                    <h2>Modal Window</h2>
                    <div class="content">{children}</div>
                    <div class="actions">
                        <button class="toggle-button" onClick={handleClose}>
                            close
                        </button>
                    </div>
                </div >
            </Fragment >
        )

}
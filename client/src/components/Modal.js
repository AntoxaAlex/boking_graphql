import React, {Fragment} from "react";

const Modal = ({closeModal,inputData,children}) => {
    return(
        <div className="front_court">
            <div className="modal_div">
                <div className="closeBtnDiv">
                    <button className="mini ui red basic button closeBtn" onClick={closeModal}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
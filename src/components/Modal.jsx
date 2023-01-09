import classNames from "classnames";
import React from "react";
import CloseButton from "./CloseButton";

const Modal = ({ children, id, active, closeActive }) => {
    // close the modal if click outside of it
    const handlClose = (e) => {
        if (e.target.id === id) closeActive();
    };
    return (
        // modal container
        <div
            id={id}
            onClick={handlClose}
            className={classNames(
                active ? "flex" : "hidden",
                "fixed inset-0 bg-black bg-opacity-60 justify-center items-center z-40",
                
            )}>
            {/* modal  */}
            <div className="absolute mt-3 rounded-3xl p-3 bg-stone-800 text-white w-96 z-50">
                {children}
            </div>
            <CloseButton onClick={closeActive} />
        </div>
    );
};

export default Modal;

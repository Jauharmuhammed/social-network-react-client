import CloseButton from "components/CloseButton";
import React from "react";



const Modal = ({children, id, active, closeActive}) => {

    // close the modal if click outside of it
    const handlClose = (e) => {
        if (e.target.id === id) closeActive();
    };
    return (
        // modal container
        <div
            id={id}
            onClick={handlClose}
            className={
                (active ? "flex" : "hidden") +
                " fixed top-0 left-0 w-full bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center z-50"
            }>
            {/* modal  */}
            <div
                className={
                    (active ? "opacity-100" : "translate-y-96 opacity-0") +
                    " transform w-full py-8 xl:px-24 relative rounded-[2rem] text-white transition-transform duration-1000 "
                }>
                {children}
           
                <CloseButton onClick={closeActive} />
            </div>
        </div>
    );
};

export default Modal;

import React from "react";
import CloseButton from "../../../components/CloseButton";



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
                " fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
            }>
            {/* modal  */}
            <div
                className={
                    (active ? "opacity-100" : "translate-y-96 opacity-0") +
                    " transform w-full sm:w-[450px] h-full flex justify-center items-center sm:h-fit relative sm:rounded-[2rem] bg-black text-white p-12 transition-transform duration-1000  sm:mt-16"
                }>
                {children}
           
                <CloseButton onClick={closeActive} />
            </div>
        </div>
    );
};

export default Modal;

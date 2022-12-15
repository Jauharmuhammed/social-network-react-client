import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const CloseButton = ({onClick}) => {
    return (
        <IoCloseSharp
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
            onClick={onClick}
        />
    );
};

export default CloseButton;

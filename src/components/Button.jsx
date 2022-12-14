import React from "react";

const Button = ({ text, primary, onClick }) => {
    const attr = {
        className:
            (primary
                ? "border-custom-yellow text-custom-yellow hover:bg-custom-yellow"
                : "border-white text-white hover:bg-white") +
            " px-5 py-2 rounded-[50q] font-inter font-medium box-border border  hover:text-black bg-transparent",
    };

    return (
        <button {...attr} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;

import React from "react";
import classNames from "classnames";

const Button = ({text, primary, onClick, className}) => {
    const attr = {
        class:
            (primary
                ? "border-custom-yellow text-custom-yellow hover:bg-custom-yellow"
                : "border-white text-white hover:bg-white") +
            " px-5 py-2 rounded-[50q] font-inter font-medium box-border border hover:text-black bg-transparent transition-all duration-300 ",
    };

    return (
        <button className={classNames(attr.class, className)} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;

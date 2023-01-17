import React from "react";
import classNames from "classnames";

const Button = ({ text, primary, white, onClick, className, ...others }) => {
    return (
        <button
            className={classNames(
                "px-5 py-2 rounded-[50q] font-inter font-medium box-border border hover:text-black bg-transparent transition-all duration-300",
                primary && white
                    ? "border-white bg-white hover:bg-opacity-80 text-black"
                    : primary
                    ? "border-custom-yellow bg-custom-yellow text-black hover:bg-opacity-80"
                    : white
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-black",
                className
            )}
            onClick={onClick}
            {...others}>
            {text}
        </button>
    );
};

export default Button;

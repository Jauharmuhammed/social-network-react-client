import React from "react";
import classNames from "classnames";

const Button = ({ type = "", className = "", disabled = false, content='', ...others }) => {
    return (
        <button
            disabled={disabled}
            className={classNames(
                className,
                "w-full rounded-3xl py-3 px-4 bg-custom-yellow text-black font-semibold outline-none"
            )}
            {...others}
            >
            {content}
        </button>
    );
};

export default Button;

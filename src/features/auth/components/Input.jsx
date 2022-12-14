import classNames from "classnames";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const Input = ({
    type = "",
    placeholder = "",
    name = "",
    value = "",
    onChange = "",
    className = "",
    error = "",
    ...others
}) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={classNames(
                    className,
                    "w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300  mb-5"
                )}
                {...others}
            />

            {error && (
                <p className="text-red-700 my-1 flex items-start ml-2 text-sm -mt-4">
                    <span className="text-base mt-0.5 mr-1">
                        <BiErrorCircle />
                    </span>
                    <span className="whitespace-pre-wrap">{error}</span>
                </p>
            )}
        </>
    );
};

export default Input;

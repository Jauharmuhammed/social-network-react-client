import React from "react";

const ErrorMessage = ({ error }) => {
    return (
        error && (
            <p className="text-red-700 -mt-3 my-1 flex justify-center items-start text-sm">
                <span>{error}</span>
            </p>
        )
    );
};

export default ErrorMessage;

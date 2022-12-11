import React from "react";

const Button = ({ text, primary, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        (primary ? "border-custom-yellow text-custom-yellow" : "border-white text-white") + ' ' +
        (primary ? "hover:bg-custom-yellow " : "hover:bg-white") +
        " px-5 py-2 rounded-[50q] font-inter font-medium box-border border  hover:text-black bg-transparent"
      }
    >
      {text}
    </button>
  );
};

export default Button;

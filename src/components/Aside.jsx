import classNames from "classnames";
import React from "react";
import CloseButton from "./CloseButton";

const Aside = ({ children, active, closeActive }) => {

    return (
  
            <div className={classNames( active ? 'fixed' : 'hidden', "right-5 bottom-3 h-[85vh] min-h-[500] rounded-3xl p-4 bg-black text-white w-96 z-50")}>
                <CloseButton onClick={closeActive} />
                {children}
            </div>
    );
};

export default Aside;

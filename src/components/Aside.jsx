import classNames from "classnames";
import React from "react";
import CloseButton from "./CloseButton";

const Aside = ({ children, active, closeActive, reference, ...others }) => {

    return (
  
            <div ref={reference} {...others} className={classNames( active ? 'fixed' : 'hidden', "top-0 sm:top-auto sm:right-5 sm:bottom-3 h-[85vh] min-h-screen sm:min-h-0 sm:rounded-3xl p-4 bg-stone-900 text-white w-full sm:w-96 z-50")}>
                <CloseButton onClick={closeActive} />
                {children}
            </div>
    );
};

export default Aside;

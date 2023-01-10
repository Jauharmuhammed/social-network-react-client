import classNames from "classnames";
import React from "react";
import CloseButton from "./CloseButton";

const Aside = ({ children, active, closeActive, reference, ...others }) => {

    return (
  
            <div ref={reference} {...others} className={classNames( active ? 'fixed' : 'hidden', "right-5 bottom-3 h-[85vh] min-h-[500] rounded-3xl p-4 bg-stone-900 text-white w-96 z-50")}>
                <CloseButton onClick={closeActive} />
                {children}
            </div>
    );
};

export default Aside;

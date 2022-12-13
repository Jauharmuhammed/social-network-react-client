import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordEye = ({visible, onClick }) => {
    const style = "absolute right-5 top-[17px] translate-y-[10%] cursor-pointer";
    if (!visible) {
        return <BsEyeSlash className={style} onClick={onClick} />;
    }
    return <BsEye className={style} onClick={onClick} />;
};

export default PasswordEye
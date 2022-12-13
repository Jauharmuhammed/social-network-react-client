import toast from "react-hot-toast";

const errorToast = (text) => {
    toast.error(text, {
        style: {
            borderRadius: "100px",
        },
    });
}

export default errorToast
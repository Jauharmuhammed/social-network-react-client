import toast from "react-hot-toast";

const successToast = (text) => {
    toast.success(text, {
        style: {
            borderRadius: "100px",
            padding:'20px'
        },
    });
}

export default successToast
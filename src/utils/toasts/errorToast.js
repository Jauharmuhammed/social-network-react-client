import toast from "react-hot-toast";

const errorToast = (text) => {
    toast.error(text, {
        style: {
            color:'white',
            borderRadius: "100px",
            padding:'20px',
            backgroundColor:'#fd4e51',
        },
    });
}

export default errorToast
import toast from "react-hot-toast";

const imageToast = ({ imageUrl, text }) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-72 bg-white shadow-lg rounded-[100px] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-2">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default imageToast
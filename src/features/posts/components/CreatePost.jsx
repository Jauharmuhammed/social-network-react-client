import Button from "components/Button";
import {ProfileCard} from "features/users";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Textarea from "react-expanding-textarea";
// import {useCreatePostMutation} from "../../../app/api/postApiSlice";
import {useNavigate} from "react-router-dom";
import successToast from "utils/toasts/successToast";
import BackdropSpinner from "components/BackdropSpinner";
import axios from "../../../lib/axios";
import TagInput from "./TagInput";
import errorToast from "utils/toasts/errorToast";
import Autocomplete from "react-google-autocomplete";

const CreatePost = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [tags, setTags] = useState([]);
    const [location, setLocation] = useState('')

    const [addTags, setAddTags] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // const [createPost, {isLoading}] = useCreatePostMutation();

    const title = useRef();
    const description = useRef();
    const [image, setImage] = useState(null);

    function handleImage(e) {
        setImage(e.target.files[0]);
    }

    function handleSubmit() {
        if (!image) {
            errorToast("Please upload an image");
            return;
        }
        setIsLoading(true);
        const data = new FormData(); // creates a new data object

        console.log(tags);

        data.append("user", user.user_id);
        data.append("tags", tags);
        data.append("image", image, image.name);
        data.append("title", title.current.value);
        data.append("description", description.current.value);

        console.log(data);
        console.log(title.current.value);
        axios
            .post("/create-post/", data, {
                headers: {
                    Authorization: `Bearer ${token?.access}`,
                },
            })
            .then((res) => {
                console.log(res);
                navigate("/");
                successToast("Post created successfully");
                setIsLoading(false);
                setImage(null);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });

        // fetch("http://127.0.0.1:8000/api/post/", {
        //     method: "POST",
        //     header: {
        //         Authorization: `Bearer ${token?.access}`,
        //     },
        //     body: data,
        // })
        //     .then((res) => {
        //         console.log(res);
        //         navigate("/");
        //         successToast("Post created successfully");
        //         setIsLoading(false);
        //         setImage(null);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setIsLoading(false);
        //         successToast(error.data);
        //     });

        // try{
        //     const response = await createPost({
        //         user: parseInt(user.user_id),
        //         image: image,
        //         title: title.current.value,
        //         description: description.current.value,
        //     }).unwrap()
        //     console.log(response);
        // }
        // catch (err) {
        //     console.log(err);
        // }
    }

    useEffect(() => {
        title.current.focus();
    }, []);

    useEffect(() => {
      console.log(location);
    }, [location])
    

    return (
        <div className="min-h-[700px] bg-[#323232] rounded-3xl my-8 xl:mx-24 p-5 text-white flex gap-10">
            {isLoading && <BackdropSpinner />}
            {image ? (
                <div className=" w-100 md:w-2/5 relative rounded-3xl  h-fit overflow-hidden">
                    <img
                        src={image ? URL.createObjectURL(image) : ""}
                        alt="uploaded"
                        className=" object-cover w-full h-full"
                    />
                    <div
                        title="Remove image?"
                        onClick={() => setImage(null)}
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 p-3 cursor-pointer rounded-full bg-custom-yellow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="0.88em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 448 512">
                            <path
                                fill="currentColor"
                                d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-200 w-100 md:w-2/5 h-[660px] rounded-3xl p-5 flex flex-col text-darkgray">
                    <label
                        className="border border-gray-400 border-dashed w-full h-4/5 rounded-2xl font-semibold flex items-center justify-center lg:p-16 text-center cursor-pointer"
                        htmlFor="image">
                        Drag and drop or click to upload
                    </label>
                    <input type="file" name="image" id="image" hidden onChange={(e) => handleImage(e)} />
                    <p className="my-auto lg:p-10 text-center font-base text-sm">
                        We recommend using high quality file under 10MB
                    </p>
                </div>
            )}

            <div className="md:w-3/5 flex flex-col gap-8">
                <Button primary text="Save" className="place-self-end" onClick={() => handleSubmit()} />
                <Textarea
                    type="text"
                    name="title"
                    id="title"
                    ref={title}
                    placeholder="Add your title"
                    className="bg-transparent border-b border-gray-400 py-2 outline-none resize-none text-4xl"
                />
                <ProfileCard imgUrl={user.profile_pic} name={user.name} followers={user.followers} />
                <Textarea
                    type="text"
                    name="description"
                    id="description"
                    ref={description}
                    placeholder="Tell everyone what is your post about"
                    className="bg-transparent border-b border-gray-400 py-2 outline-none resize-none"
                />
                <Autocomplete
                    apiKey={process.env.GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                        console.log(place);
                        setLocation(place)
                    }}
                    defaultValue="Amsterdam"
                    className='bg-transparent py-2 border-b outline-none'
                />
                {addTags ? (
                    <TagInput tags={tags} setTags={setTags} />
                ) : (
                    <Button onClick={() => setAddTags(true)} text="Add Tags" className="place-self-start" />
                )}
            </div>
        </div>
    );
};

export default CreatePost;

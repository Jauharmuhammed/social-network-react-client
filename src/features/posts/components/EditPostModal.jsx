import Autocomplete from "react-google-autocomplete";
import React, { useRef, useState } from "react";
import TagInput from "./TagInput";
import Textarea from "react-expanding-textarea";
import Button from "components/Button";
import { useEffect } from "react";
import Modal from "features/posts/components/Modal";
import axios from "../../../lib/axios";
import { useSelector } from "react-redux";
import successToast from "utils/toasts/successToast";
import BackdropSpinner from "components/BackdropSpinner";
import { singlePost } from "../services/postSlice";

const EditPostModal = ({ edit, setEdit }) => {
    const token = useSelector((state) => state.auth.token);
    const post = useSelector(singlePost)

    const title = useRef();
    const description = useRef();
    const location = useRef();
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit() {
        if (isLoading) return;
        setIsLoading(true);
        const data = new FormData(); // creates a new data object


        data.append("tags", tags);
        data.append("title", title.current.value);
        data.append("description", description.current.value);
        data.append("location", location.current.value);

        axios
            .put(`/edit-post/${post?.id}/`, data, {
                headers: {
                    Authorization: `Bearer ${token?.access}`,
                },
            })
            .then((res) => {
                console.log(res);
                successToast("Post Edited successfully");
                setEdit(false)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        setTags(post.tags);
        title.current.value = post?.title
        description.current.value = post?.description
    }, [post]);

    useEffect(() => {
        title.current.focus();
    }, []);

    return (
        <Modal
            id="editPostModalContainer"
            active={edit}
            closeActive={() => setEdit(false)}>
            <div className="h-[700px] bg-[#323232] rounded-3xl my-8 mx-10 xl:mx-24 p-5 text-white flex gap-10">
                {isLoading && <BackdropSpinner />}
                {post?.image && (
                    <div className=" h-fit w-100 md:w-2/5 relative rounded-3xl overflow-hidden">
                        <img src={post?.image} alt="uploaded" className=" object-cover w-full " />
                    </div>
                )}
                <div className="md:w-3/5 flex flex-col gap-8">
                    <Button
                        primary
                        text="Save"
                        className="place-self-end"
                        onClick={() => handleSubmit()}
                    />
                    <Textarea
                        type="text"
                        name="title"
                        id="title"
                        ref={title}
                        placeholder="Add your title"
                        className="bg-transparent border-b border-gray-400 py-2 outline-none resize-none text-4xl"
                    />

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
                        ref={location}
                        defaultValue={post?.location ? post?.location : ''}
                        className="bg-transparent py-2 border-b outline-none"
                    />
                    <TagInput tags={tags} setTags={setTags} />
                </div>
            </div>
        </Modal>
    );
};

export default EditPostModal;

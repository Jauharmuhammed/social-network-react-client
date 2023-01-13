import Button from "components/Button";
import Modal from "components/Modal";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { closeEditCollectionModal, openCollectionModal, openDeleteCollectionModal } from "../services/collectionModalSlice";
import axios from "../../../lib/axios";
import errorToast from "utils/toasts/errorToast";
import { updateCurrentUserCollections } from "../services/collectionSlice";
import Spinner from "components/Spinner";
import ButtonSpinner from "components/ButtonSpinner";

const EditCollectionModal = ({collection}) => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const editCollectionModalOverlay = useSelector(
        (state) => state.collectionModal.editCollectionModal
    );
    const [privateEnabled, setPrivateEnabled] = useState(false);
    const [image, setImage] = useState(null);

    const [isLoading, setisLoading] = useState(false);
    const name = useRef();
    const [initialLoading, setInitialLoading] = useState(false);

    function handleSubmit() {
        if (name.current.value === '') {
            errorToast('Name field cannot be empty!')
        }
        setisLoading(true);
        const formData = new FormData();

        formData.append("user", user.user_id);
        image && formData.append("cover", image);
        collection?.name !== name.current.value && formData.append("name", name.current.value);
        Boolean(collection?.private) !== Boolean(privateEnabled) && formData.append("private", privateEnabled ? 'True' : 'False');

        axios
            .put(`/collection/edit/${collection?.slug}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token?.access}`,
                },
            })
            .then((res) => {
                console.log(res);
                dispatch(updateCurrentUserCollections(res.data));

                dispatch(closeEditCollectionModal());
                setisLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data === "A collection With the same name already exists") {
                    errorToast(err.response.data);
                }
                setisLoading(false);
            });
    }

    function openDelete() {
        dispatch(openDeleteCollectionModal())
        dispatch(closeEditCollectionModal())
    }

    function handleImage(image) {
        setImage(image);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if (collection?.cover) {
            setInitialLoading(true);
        }
    }, [collection?.cover]);

    useEffect(() => {
      name.current.focus()

      if (collection?.private) {
        setPrivateEnabled(true)
      }
    }, [collection])
    

    return (
        <Modal
            id="editCollectionModal"
            active={editCollectionModalOverlay}
            closeActive={() => dispatch(closeEditCollectionModal())}>
            <h3 className="text-center my-3">Edit Collection</h3>
            <div className=" py-5 px-3 flex flex-col gap-5 ">
                <input
                    className="w-full bg-transparent border rounded-3xl py-2 px-3 outline-none"
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name"
                    ref={name}
                    defaultValue={collection?.name}
                />
                {image || initialLoading ? (
                    <div className="w-1/2 md:w-2/5 relative rounded-3xl aspect-square overflow-hidden">
                        <img
                            src={
                                image && initialLoading
                                    ? URL.createObjectURL(image)
                                    : image
                                    ? URL.createObjectURL(image)
                                    : collection?.cover
                            }
                            alt="uploaded"
                            className=" object-cover w-full h-full"
                        />
                        <div
                            title="Remove image?"
                            onClick={() => {
                                setImage(null);
                                setInitialLoading(false);
                            }}
                            className="absolute bottom-5 left-1/2 -translate-x-1/2 p-3 cursor-pointer rounded-full bg-custom-yellow text-darkgray">
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
                    <div className="bg-slate-200 w-1/2 md:w-2/5 aspect-square rounded-3xl flex flex-col p-2 flex-auto text-darkgray">
                        <FileUploader
                            handleChange={handleImage}
                            label="Drag and drop or click to upload"
                            name="file"
                            hoverTitle=" "
                            types={["JPEG", "JPG", "PNG", "GIF"]}>
                            <div
                                className="border border-gray-400 border-dashed w-full h-full rounded-2xl font-semibold flex items-center justify-center py-5 text-center cursor-pointer"
                                htmlFor="image">
                                Drag and drop or click to upload
                            </div>
                        </FileUploader>
                    </div>
                )}
                <label className="inline-flex relative items-center mr-5 cursor-pointer mb-2">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={privateEnabled}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setPrivateEnabled((prev) => !prev);
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ml-2 text-sm font-medium">Pivate Collection</span>
                </label>
                <div className="flex justify-between">
                    <Button onClick={openDelete} text="Delete" />
                    <Button
                        onClick={handleSubmit}
                        text={ isLoading ? <ButtonSpinner/> :"Save"}
                        primary
                        className="bg-custom-yellow text-black"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default EditCollectionModal;

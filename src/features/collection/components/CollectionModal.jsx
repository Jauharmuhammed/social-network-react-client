import Modal from "components/Modal";
import { SaveButton } from "features/posts";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCollectionModal, openCreateCollectionModal } from "../services/collectionModalSlice";
import { setCurrentCollection } from "../services/collectionSlice";

const CollectionModal = () => {
    const collections = useSelector((state) => state.collection.currentUserCollections);
    const postToSave = useSelector((state) => state.collection.selectedPostToSave);
    const collectionModalOverlay = useSelector((state) => state.collectionModal.collectionModal);
    const dispatch = useDispatch();

    const [hoveringItem, setHoveringItem] = useState("");
    return (
        <Modal
            id="collectionModal"
            active={collectionModalOverlay}
            closeActive={() => dispatch(closeCollectionModal())}>
            <h3 className="text-center my-3">Save to Collections</h3>
            <div className="px-2 my-3 max-h-[55vh]">
                <ul className="max-h-[50vh] overflow-y-auto ">
                    {collections?.map((collection) => (
                        <li
                            key={collection.id}
                            onClick={(e) => {
                                dispatch(setCurrentCollection(collection));
                                if (e.target.id !== `saveButton-${collection.id}`) {
                                    dispatch(closeCollectionModal());
                                }
                            }}
                            onMouseEnter={() => setHoveringItem(collection?.id)}
                            onMouseLeave={() => setHoveringItem("")}
                            className="p-2 flex justify-between  hover:bg-stone-700 rounded-full cursor-pointer">
                            <div className="flex gap-4 items-center">
                                {collection.cover ? (
                                    <img
                                        className="w-12 aspect-square rounded-full"
                                        src={collection.cover}
                                        alt={collection.name}
                                    />
                                ) : (
                                    <div className="w-12 aspect-square rounded-full bg-stone-500"></div>
                                )}
                                <span>{collection.name}</span>
                            </div>
                            <div className="flex items-center mr-2.5">
                                {hoveringItem === collection.id && (
                                    <SaveButton
                                        post={postToSave}
                                        collectionToSave={collection}
                                        id={`saveButton-${collection.id}`}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <div
                    onClick={() => dispatch(openCreateCollectionModal())}
                    className="p-2 flex justify-between hover:bg-stone-700 rounded-full cursor-pointer">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 aspect-square rounded-full bg-stone-500  text-black flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2em"
                                height="2em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
                            </svg>
                        </div>
                        <span>Create New Collection</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CollectionModal;

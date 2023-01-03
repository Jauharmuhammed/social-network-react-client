import Modal from "components/Modal";
import { SaveButton } from "features/posts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCollectionChange } from "../services/collectionModalSlice";
import { setCurrentCollection } from "../services/collectionSlice";

const CollectionChangeModal = () => {
    const collections = useSelector((state) => state.collection.currentUserCollections);
    const postToSave = useSelector((state) => state.collection.selectedPostToSave);
    const collectionChangeModalOverlay = useSelector(
        (state) => state.collectionModal.collectionChangeModal
    );
    const dispatch = useDispatch();
    return (
        <Modal
            id="collectionChangeModal"
            active={collectionChangeModalOverlay}
            closeActive={() => dispatch(closeCollectionChange())}>
            <h3 className="text-center my-3">Save to Collections</h3>
            <ul className="px-2">
                {collections?.map((collection) => (
                    <li
                        key={collection.id}
                        onClick={(e) => {
                            dispatch(setCurrentCollection(collection));
                            if (e.target.id !== `saveButton-${collection.id}`) {
                                dispatch(closeCollectionChange());
                            }
                        }}
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
                            <SaveButton
                                post={postToSave}
                                collectionToSave={collection}
                                id={`saveButton-${collection.id}`}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default CollectionChangeModal;

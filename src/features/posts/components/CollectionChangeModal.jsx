import Modal from "components/Modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCollectionChange } from "../services/postModalSlice";

const CollectionChangeModal = () => {
    const collections = useSelector((state) => state.auth.collections);
    const collectionChangeModalOverlay = useSelector(
        (state) => state.postModal.collectionChangeModal
    );
    const dispatch = useDispatch();
    return (
        <Modal
            id="collectionChangeModal"
            active={collectionChangeModalOverlay}
            closeActive={() => dispatch(closeCollectionChange())}>
            <ul className="p-3 ">
                {collections?.map((collection) => (
                    <li className=" mb-3 flex gap-4 items-center">
                        {collection.cover ? <img className="w-12 aspect-square rounded-full" src={collection.cover} alt={collection.name} /> : <div className="w-12 aspect-square rounded-full bg-stone-500"></div>}
                        <span>{collection.name}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default CollectionChangeModal;

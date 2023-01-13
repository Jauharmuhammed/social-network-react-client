import Modal from "components/Modal";
import { SaveButton } from "features/posts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCollectionModal, openCreateCollectionModal } from "../services/collectionModalSlice";
import { setCurrentCollection } from "../services/collectionSlice";

const CollectionModal = () => {
    const collections = useSelector((state) => state.collection.currentUserCollections);
    const postToSave = useSelector((state) => state.collection.selectedPostToSave);
    const collectionModalOverlay = useSelector((state) => state.collectionModal.collectionModal);
    const dispatch = useDispatch();

    const [hoveringItem, setHoveringItem] = useState("");
    useEffect(() => {
      console.log('collections',collections)
    }, [collections])
    
    return (
        <Modal
            id="collectionModal"
            active={collectionModalOverlay}
            closeActive={() => dispatch(closeCollectionModal())}>
            <h3 className="text-center my-3">Save to Collections</h3>
            <div className="pl-2 pr-1 my-3 max-h-[27.5rem]">
                <ul className="customScrollbar max-h-[24rem] overflow-y-auto pr-2">
                    {collections?.map((collection) => (
                        <li
                            key={collection.slug}
                            onClick={(e) => {
                                dispatch(setCurrentCollection(collection));
                                if (e.target.id !== `saveButton-${collection.slug}`) {
                                    dispatch(closeCollectionModal());
                                }
                            }}
                            onMouseEnter={() => setHoveringItem(collection?.slug)}
                            onMouseLeave={() => setHoveringItem("")}
                            className="p-2 flex justify-between  hover:bg-stone-700 rounded-full cursor-pointer relative">
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
                            {collection.private && <span className="text-white flex items-center mr-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm6-5q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6Z"/></svg>
                                </span>}
                            <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                {hoveringItem === collection.slug && (
                                    <SaveButton
                                        post={postToSave}
                                        collectionToSave={collection}
                                        id={`saveButton-${collection.slug}`}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <div
                    onClick={() => dispatch(openCreateCollectionModal())}
                    className="p-2 mr-2 flex justify-between hover:bg-stone-700 rounded-full cursor-pointer">
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

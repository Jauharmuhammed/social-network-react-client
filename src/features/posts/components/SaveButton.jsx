import {
    useRemoveFromCollectionMutation,
    useSaveToCollectionsMutation,
} from "app/api/collectionApiSlice";
import Button from "components/Button";
import { openCollectionChange } from "features/collection/services/collectionModalSlice";
import { updateCurrentUserCollections } from "features/collection/services/collectionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import customToast from "utils/toasts/customToast";

const SaveButton = ({ post }) => {
    const collection = useSelector((state) => state.collection.currentCollection);
    const currentCollection = useSelector((state) => state.collection.currentCollection);
    const [saved, setSaved] = useState(false);

    const [saveToCollection] = useSaveToCollectionsMutation();
    const [removeFromCollection] = useRemoveFromCollectionMutation();

    const dispatch = useDispatch();

    async function handleSave() {
        try {
            if (saved) {

                // if already saved remove from collection
                const response = await removeFromCollection({
                    post: post?.id,
                    slug: collection?.slug,
                });
                console.log(response);
                setSaved(false);
                if (response.data !== null) {
                    dispatch(updateCurrentUserCollections(response));
                    customToast({imageUrl: post?.image, text:'Removed from Collection'})
                }
            } else {

                // if not already saved save to collection
                const response = await saveToCollection({ post: post?.id, slug: collection?.slug });
                console.log(response);
                setSaved(true);
                if (response.data !== null || response.data !== 'Post is not in the collection') {
                    dispatch(updateCurrentUserCollections(response));
                    customToast({imageUrl: post?.image, text:`Saved to ${collection.name}`})
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (currentCollection?.posts?.some((obj) => obj === post?.id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [currentCollection, post]);

    return (
        <>
            <div
                onClick={() => dispatch(openCollectionChange())}
                className="flex items-center max-w-[60%]">
                <p className="ml-2 text-sm whitespace-nowrap max-w overflow-hidden text-ellipsis">
                    {currentCollection?.name}
                </p>
                <span className="cursor-pointer rotate-90">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                        />
                    </svg>
                </span>
            </div>
            {!saved ? (
                <Button
                    onClick={handleSave}
                    primary
                    text="Save"
                    className="hover:bg-opacity-90 px-2 py-1 text-darkgray bg-custom-yellow"
                />
            ) : (
                <Button
                    onClick={handleSave}
                    text="Remove"
                    className=" px-2 py-1 text-darkgray bg-white hover:bg-opacity-90 hover:bg-white"
                />
            )}
        </>
    );
};

export default SaveButton;

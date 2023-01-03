import {
    useRemoveFromCollectionMutation,
    useSaveToCollectionsMutation,
} from "app/api/collectionApiSlice";
import Button from "components/Button";
import { updateCurrentUserCollections } from "features/collection/services/collectionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import customToast from "utils/toasts/customToast";

const SaveButton = ({ post, collectionToSave = {}, ...others }) => {
    const collection = useSelector((state) => state.collection.currentCollection);
    const currentCollection = useSelector((state) => state.collection.currentCollection);
    const [saved, setSaved] = useState(false);

    const [saveToCollection] = useSaveToCollectionsMutation();
    const [removeFromCollection] = useRemoveFromCollectionMutation();

    const dispatch = useDispatch();

    async function handleSave() {
        const slug = collectionToSave ? collectionToSave.slug : collection.slug
        try {
            if (saved) {
                // if already saved remove from collection
                const response = await removeFromCollection({
                    post: post?.id,
                    slug
                });
                console.log(response);
                setSaved(false);
                if (response.data !== null) {
                    dispatch(updateCurrentUserCollections(response));
                    customToast({ imageUrl: post?.image, text: "Removed from Collection" });
                }
            } else {
                // if not already saved save to collection
                const response = await saveToCollection({ post: post?.id, slug });
                console.log(response);
                setSaved(true);
                if (response.data !== null || response.data !== "Post is not in the collection") {
                    dispatch(updateCurrentUserCollections(response));
                    customToast({ imageUrl: post?.image, text: `Saved to ${collection.name}` });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (collectionToSave) {
            if (collectionToSave?.posts?.some((obj) => obj === post?.id)) {
                setSaved(true);
            } else {
                setSaved(false);
            }
        } else {
            if (currentCollection?.posts?.some((obj) => obj === post?.id)) {
                setSaved(true);
            } else {
                setSaved(false);
            }
        }
    }, [currentCollection, post]);

    return (
        <>
            {!saved ? (
                <Button
                    onClick={handleSave}
                    primary
                    text="Save"
                    className="hover:bg-opacity-90 px-2 py-1 text-darkgray bg-custom-yellow"
                    {...others}
                />
            ) : (
                <Button
                    onClick={handleSave}
                    text="Remove"
                    className=" px-2 py-1 text-darkgray bg-white hover:bg-opacity-90 hover:bg-white"
                    {...others}
                />
            )}
        </>
    );
};

export default SaveButton;

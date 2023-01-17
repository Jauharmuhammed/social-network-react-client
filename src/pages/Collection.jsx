import { usePostsByCollectionMutation } from "app/api/usersApiSlice";
import { EditCollectionModal } from "features/collection";
import CollaboratorModal from "features/collection/components/CollaboratorModal";
import DeleteCollectionModal from "features/collection/components/DeleteCollectionModal";
import { openCollaboratorModal, openEditCollectionModal } from "features/collection/services/collectionModalSlice";
import { setCurrentCollection } from "features/collection/services/collectionSlice";
import { Posts } from "features/posts";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Collection = () => {
    const currentUserCollections = useSelector((state) => state.collection.currentUserCollections);
    const user = useSelector((state) => state.auth.user);
    const { username, collection } = useParams();
    const [getPostsByCollection, { isLoading }] = usePostsByCollectionMutation();

    const [posts, setPosts] = useState([]);
    const [collectionDetails, setCollectionDetails] = useState(null);

    const dispatch = useDispatch();

    async function fetchPosts() {
        try {
            const response = await getPostsByCollection({ username, slug: collection }).unwrap();
            console.log(response);
            setPosts(response.posts);
            setCollectionDetails(response.collection);
            dispatch(setCurrentCollection(response.collection));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [username, collection]);

    useEffect(() => {
        if (username === user?.username) {
            console.log("changed inside");
            fetchPosts();
        }
        console.log("changed");
    }, [currentUserCollections]);

    return (
        <>
                <CollaboratorModal />
                <div className="w-full my-16 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 justify-center ml-6">
                        <h1 className="text-2xl md:text-5xl ">{collectionDetails?.name}</h1>
                        {collectionDetails?.user === user?.user_id && <span className="cursor-pointer" onClick={() => dispatch(openEditCollectionModal())}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM4 21q-.425 0-.712-.288Q3 20.425 3 20v-2.825q0-.2.075-.387q.075-.188.225-.338l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225q-.188.075-.388.075Z"
                                />
                            </svg>
                        </span>}
                    </div>
                    <div
                        onClick={() => dispatch(openCollaboratorModal())}
                        className="flex relative  cursor-pointer">
                        <img
                            className="w-14 aspect-square object-cover rounded-full"
                            src={collectionDetails?.profile_pic}
                            alt={`${collectionDetails?.name} user`}
                        />
                        <div className="w-14 absolute top-0 left-1/2 aspect-square rounded-full bg-stone-300  text-black flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2em"
                                height="2em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
                            </svg>
                        </div>
                    </div>
                    {collectionDetails?.private && (
                        <span className="text-white flex items-center gap-2 ml-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm6-5q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6Z"
                                />
                            </svg>
                            <span className=" text-gray-300">Private Collection</span>
                        </span>
                    )}
                </div>
                {posts.length > 0 ? (
                    <Posts posts={posts} />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2 className="text-3xl  mt-32">No saved posts yet! </h2>
                        <Link to="/" className="text-custom-yellow">
                            Save some posts
                        </Link>
                    </div>
                )}
            <EditCollectionModal collection={collectionDetails}/>
            <DeleteCollectionModal collection={collectionDetails}/>
        </>
    );
};

export default Collection;

import { usePostsByCollectionMutation } from "app/api/usersApiSlice";
import { Layout } from "components/Layout";
import { Posts } from "features/posts";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Collection = () => {
    const currentUserCollections = useSelector((state) => state.collection.currentUserCollections);
    const user = useSelector((state) => state.auth.user);
    const { username, collection } = useParams();
    const [getPostsByCollection, { isLoading }] = usePostsByCollectionMutation();

    const [posts, setPosts] = useState([]);
    const [collectionDetails, setCollectionDetails] = useState(null);

    async function fetchPosts() {
        try {
            const response = await getPostsByCollection({ username, slug: collection }).unwrap();
            console.log(response);
            setPosts(response.posts);
            setCollectionDetails(response.collection);
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
        <Layout>
            <div className="w-full my-16 flex flex-col items-center gap-5">
                <h1 className="text-5xl">{collectionDetails?.name}</h1>
                <img
                    className="w-16 aspect-square object-cover rounded-full"
                    src={collectionDetails?.profile_pic}
                    alt={`${collectionDetails?.name} user`}
                />
            </div>
            <Posts posts={posts} />
        </Layout>
    );
};

export default Collection;

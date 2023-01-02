import { usePostsByUserMutation } from "app/api/usersApiSlice";
import Spinner from "components/Spinner";
import { Posts } from "features/posts";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const CreatedPosts = ({ username }) => {
    const [postsByUser, { isLoading }] = usePostsByUserMutation();
    const [posts, setPosts] = useState([]);

    async function fetchPostsByUser() {
        try {
            const response = await postsByUser({ username }).unwrap();
            console.log(response);
            setPosts(response)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPostsByUser();
    }, [username]);

    if (isLoading) return <Spinner />;

    return <Posts posts={posts} />;
};

export default CreatedPosts;

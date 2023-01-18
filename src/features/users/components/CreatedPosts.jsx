import { usePostsByUserMutation } from "app/api/usersApiSlice";
import Spinner from "components/Spinner";
import { Posts } from "features/posts";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreatedPosts = ({ username }) => {
    const [postsByUser, { isLoading }] = usePostsByUserMutation();
    const [posts, setPosts] = useState([]);

    async function fetchPostsByUser() {
        try {
            const response = await postsByUser({ username }).unwrap();
            console.log(response);
            setPosts(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPostsByUser();
    }, [username]);

    if (isLoading) return <Spinner />;

    return posts.length > 0 ? (
        <Posts posts={posts} />
    ) : (
        !isLoading && (
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-3xl  mt-32">No posts yet! </h2>
                <Link to="/create" className="text-custom-yellow">
                    Add first post
                </Link>
            </div>
        )
    );
};

export default CreatedPosts;

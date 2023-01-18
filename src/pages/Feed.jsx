import React from "react";
// import Post from "components/Post";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
    useGetAllPostMutation,
    useGetAllTagsQuery,
    useGetPostsByTagMutation,
} from "app/api/postApiSlice";
import Post from "features/posts/components/Post";
import { useState } from "react";
import BackdropSpinner from "components/BackdropSpinner";
import { useParams } from "react-router-dom";
import { Posts, Tags } from "features/posts";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const { tag } = useParams();

    const [getAllPosts, { isLoading }] = useGetAllPostMutation();
    const [getPostsByTag, { isLoading: isTagLoading }] = useGetPostsByTagMutation();

    const { data: tagsList } = useGetAllTagsQuery();

    async function fetchAllPost() {
        try {
            const response = await getAllPosts().unwrap();
            console.log(response);
            setPosts(response);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchPostByTag() {
        try {
            const response = await getPostsByTag({ tag }).unwrap();
            console.log(response);
            setPosts(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (tag) {
            fetchPostByTag();
        } else {
            fetchAllPost();
        }
    }, [tag]);

    useEffect(() => {
        if (tagsList) {
            setTags([...tagsList.map((tag) => tag.name)]);
        }
    }, [tagsList]);

    return (
        <>
            {(isLoading || isTagLoading) && <BackdropSpinner />}
            {user && (
                <section className="sm:py-6 px-1 sm:px-12 md:px-14 xl:px-0">
                    <div className="mb-5 px-2">{tags && <Tags tags={tags} />}</div>
                    <Posts posts={posts} />
                </section>
            )}
        </>
    );
};

export default Feed;

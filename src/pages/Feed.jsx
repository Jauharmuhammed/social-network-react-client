import React from "react";
// import Post from "components/Post";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { useEffect } from "react";
import {
    useGetAllPostMutation,
    useGetAllTagsQuery,
    useGetPostsByTagMutation,
} from "app/api/postApiSlice";
import Post from "features/posts/components/Post";
import { useState } from "react";
import BackdropSpinner from "components/BackdropSpinner";
import { Masonry } from "@mui/lab";
import { useParams } from "react-router-dom";
import { Tags } from "features/posts";

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
                <Layout>
                    <section className="py-10">
                        <div className="mb-5">{tags && <Tags tags={tags} />}</div>
                        <Masonry columns={{ xs: 2, md: 3, lg: 5 }} spacing={2}>
                            {posts?.map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </Masonry>
                    </section>
                </Layout>
            )}
        </>
    );
};

export default Feed;

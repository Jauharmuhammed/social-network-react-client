import React from "react";
// import Post from "components/Post";
import {useSelector} from "react-redux";
import {Layout} from "../components/Layout";
import {useEffect} from "react";
import {useGetAllPostMutation} from "app/api/postApiSlice";
import Post from "features/posts/components/Post";
import {useState} from "react";
import BackdropSpinner from "components/BackdropSpinner";
import { Masonry } from "@mui/lab";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.auth.user);

    const [getAllPosts, {isLoading}] = useGetAllPostMutation();

    async function fetchAllPost() {
        try {
            const response = await getAllPosts().unwrap();
            console.log(response);
            setPosts(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAllPost();
    }, []);

    if (isLoading) return;

    return (
        <>
            {isLoading && <BackdropSpinner />}
            {user && (
                <Layout>
                    <section className='py-10'>
                        <Masonry columns={{ xs: 2, md: 3, lg:5 }} spacing={2} >
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

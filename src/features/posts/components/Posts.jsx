import React from "react";
import { Masonry } from "@mui/lab";
import { Post } from "..";

const Posts = ({ posts }) => {
    return (
        <Masonry columns={{ xs: 2, md: 3, lg: 5 }} spacing={2}>
            {posts?.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </Masonry>
    );
};

export default Posts;

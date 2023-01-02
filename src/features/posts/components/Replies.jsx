import {useGetRepliesMutation} from "app/api/postApiSlice";
import React, {useEffect, useState} from "react";
import Reply from "./Reply";

const Replies = ({comment, commentRef, setReplyTo}) => {
    const [getReplies] = useGetRepliesMutation();
    const [replies, setReplies] = useState([]);

    async function fetchReplies() {
        try {
            const response = await getReplies(comment?.id).unwrap();
            console.log(response);
            setReplies(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(comment?.id);
        if (comment?.id !== undefined) {
            fetchReplies();
        }
    }, [comment]);

    return (
        <ul>
            {replies &&
                replies?.map((reply) => (
                    <Reply key={reply.id} reply={reply} setReplies={setReplies} commentRef={commentRef} setReplyTo={setReplyTo}/>
                ))}
        </ul>
    );
};

export default Replies;

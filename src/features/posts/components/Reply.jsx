import TimeAgo from "components/TimeAgo";
import React, {useEffect, useState} from "react";

const Reply = ({reply, setReplyTo, commentRef, comments}) => {
    const [replyBody, setReplyBody] = useState("");
    const [hidden, setHidden] = useState(true);
    const [clipped, setClipped] = useState(false);

    useEffect(() => {
        if (reply.body.length > 80) {
            setReplyBody(reply.body.substring(0, 80));
            setClipped(true);
        } else {
            setReplyBody(reply.body);
        }
    }, [reply.body]);
    return (
        <li className="pl-10 flex gap-2">
            <img className="w-8 h-8 rounded-full object-cover" src={reply.profile_pic} alt="" />
            <div className="flex-col">
                <p className="text-sm font-light text-gray-100">
                    <span className="text-base font-normal text-white mr-2">{reply.username}</span>
                    {replyBody} 
                    {clipped && (
                        <span
                            onClick={() => {
                                setReplyBody((prev) =>
                                    prev === reply.body ? reply.body.substring(0, 80) : reply.body
                                );
                                setHidden((prev) => !prev);
                            }}
                            className="text-white font-normal ml-auto cursor-pointer">
                            &nbsp;...{hidden ? "See more" : "See less"}
                        </span>
                    )}
                </p>

                <div className="flex gap-3">
                    <TimeAgo timestamp={reply.created} className="text-gray-400 text-sm font-light" />
                    <span
                        onClick={() => {
                            setReplyTo(comments.find((comment) => comment.id ===reply.parent));
                            commentRef.current.focus();
                            commentRef.current.value = `@${reply.username} `;
                        }}
                        className="text-gray-400 text-sm cursor-pointer">
                        Reply
                    </span>
                </div>
            </div>
        </li>
    );
};

export default Reply;

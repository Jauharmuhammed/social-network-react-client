import React, {useEffect, useState} from "react";
import TimeAgo from "components/TimeAgo";

const Comment = ({comment}) => {
    const [commentBody, setCommentBody] = useState("");
    const [hidden, setHidden] = useState(true);
    const [clipped, setClipped] = useState(false)

    useEffect(() => {
        if (comment.body.length > 80) {
            setCommentBody(comment.body.substring(0, 80));
            setClipped(true);
        } else {
            setCommentBody(comment.body);
        }
    }, [comment.body]);

    return (
        <li className="flex gap-2">
            <img className="w-8 h-8 rounded-full object-cover" src={comment.profile_pic} alt="" />
            <div className="flex-col">
                <p className="text-sm font-light text-gray-100">
                    <span className="text-base font-normal text-white mr-2">{comment.username}</span>
                    {commentBody}
                    {clipped && (
                        <span
                            onClick={() => {
                                setCommentBody((prev) => prev === comment.body ? comment.body.substring(0, 80) : comment.body);
                                setHidden((prev) => !prev)
                            }}
                            className="text-white font-normal ml-auto cursor-pointer">
                            &nbsp;...{hidden ? 'See more' : 'See less'}
                        </span>
                    )}
                </p>

                <div className="flex gap-3">
                    <TimeAgo timestamp={comment.created} className="text-gray-400 text-sm font-light" />
                    <span className="text-gray-400 text-sm cursor-pointer">Reply</span>
                </div>
            </div>
        </li>
    );
};

export default Comment;

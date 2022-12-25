import React, {useEffect, useState} from "react";
import TimeAgo from "components/TimeAgo";
import Replies from "./Replies";

const Comment = ({comment, setReplyTo, commentRef, comments}) => {
    const [commentBody, setCommentBody] = useState("");
    const [hidden, setHidden] = useState(true);
    const [clipped, setClipped] = useState(false);
    const [showReplies, setShowReplies] = useState(false)

    useEffect(() => {
        if (comment.body.length > 80) {
            setCommentBody(comment.body.substring(0, 80));
            setClipped(true);
        } else {
            setCommentBody(comment.body);
        }
    }, [comment.body]);

    useEffect(() => {
      if(comment?.replies_count > 0 && comment?.replies_count < 2){
        setShowReplies(true)
      }
    }, [comment])
    

    return (
        <li className="flex flex-col gap-2">
            <div className="flex gap-2">
                <img className="w-8 h-8 rounded-full object-cover cursor-pointer" src={comment.profile_pic} alt={comment.username} />
                <div className="flex-col">
                    <p className="text-sm font-light text-gray-100">
                        <span className="text-base font-normal text-white mr-2">{comment.username}</span>
                        {commentBody}
                        {clipped && (
                            <span
                                onClick={() => {
                                    setCommentBody((prev) =>
                                        prev === comment.body ? comment.body.substring(0, 80) : comment.body
                                    );
                                    setHidden((prev) => !prev);
                                }}
                                className="text-white font-normal ml-auto cursor-pointer">
                                &nbsp;...{hidden ? "See more" : "See less"}
                            </span>
                        )}
                    </p>
                    <div className="flex gap-3">
                        <TimeAgo timestamp={comment.created} className="text-gray-400 text-sm font-light" />
                        <span
                            onClick={() => {
                                setReplyTo(comment);
                                commentRef.current.focus();
                                commentRef.current.value = `@${comment.username} `;
                            }}
                            className="text-gray-400 text-sm cursor-pointer ">
                            Reply
                        </span>
                        {comment?.replies_count > 0 && (
                            <span onClick={()=> setShowReplies((prev)=> !prev)} className="text-gray-400 text-sm cursor-pointer">
                                { showReplies ? 'Hide Replies'  : `View replies (${comment?.replies_count})`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {showReplies && <Replies comment={comment} commentRef={commentRef} setReplyTo={setReplyTo} comments={comments}/>}
        </li>
    );
};

export default Comment;

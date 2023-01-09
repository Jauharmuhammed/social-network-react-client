import Aside from "components/Aside";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chat, Conversations } from "..";
import { closeChatModal } from "../services/chatModalSlice";

const ChatLayout = () => {
    const chatModal = useSelector((state) => state.chatModal.chatModal);
    const conversationName = useSelector((state) => state.chat.currentConversation);
    const dispatch = useDispatch()
    return (
        <Aside active={chatModal} closeActive={() => dispatch(closeChatModal())}>
            {conversationName ? <Chat/> : <Conversations/>}
        </Aside>
    );
};

export default ChatLayout;

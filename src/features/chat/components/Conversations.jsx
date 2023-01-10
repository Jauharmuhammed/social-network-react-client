import { useSearchUsersMutation } from "app/api/chatApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversation } from "../services/chatSlice";
import ActiveConversations from "./ActiveConversation";
import ProfileCard from "./ProfileCard";

const Conversations = () => {
    const user = useSelector((state) => state.auth.user);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [searchUsers, { isLoading }] = useSearchUsersMutation();

    const dispatch = useDispatch();

    async function fetchUsers() {
        if (searchQuery === "") return setUsers([]);
        try {
            const res = await searchUsers({ q: searchQuery }).unwrap();
            console.log(res);
            setUsers(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);

    function createConversationName(username) {
        const namesAlph = [user?.username, username].sort();
        return `${namesAlph[0]}__${namesAlph[1]}`;
    }

    return (
        <>
            <h3 className="text-center my-1">Messages</h3>
            <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 px-4 bg-transparent outline-none rounded-3xl border w-full mt-3 box"
                placeholder="Search"
            />
            <div className="flex flex-col gap-2 mt-2">
                {users
                    ?.filter((u) => u.username !== user?.username)
                    .map((u) => (
                        <ProfileCard
                            onClick={() =>
                                dispatch(setCurrentConversation(createConversationName(u.username)))
                            }
                            key={u.id}
                            user={u}
                        />
                    ))}
            </div>
            {searchQuery === "" && <ActiveConversations />}
        </>
    );
};

export default Conversations;

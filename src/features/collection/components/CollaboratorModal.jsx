import { useSearchUsersMutation } from 'app/api/chatApiSlice';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ProfileCard from 'features/chat/components/ProfileCard';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeCollaboratorModal } from '../services/collectionModalSlice';

const CollaboratorModal = () => {
    const collaboratorModalOverlay = useSelector((state) => state.collectionModal.collaboratorModal);
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

    function inviteCollaborator(user){
      console.log(user)
    }

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);
  return (
    <Modal
            id="collaboratorsModal"
            active={collaboratorModalOverlay}
            closeActive={() => dispatch(closeCollaboratorModal())}>
            <h3 className="text-center my-3 text-xl">Add Collaborators </h3>


            <div className="my-3">
              <input
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 px-4 bg-transparent outline-none rounded-3xl border w-full mt-3 box"
                  placeholder="Search"
              />
              <div className="flex flex-col gap-2 mt-4">
                  {users
                      ?.filter((u) => u.username !== user?.username)
                      .map((u) => (
                          <div className="flex justify-between">
                            <ProfileCard
                            
                                key={u.id}
                                user={u}
                            
                            />
                            <Button primary text='Invite' onClick={() =>inviteCollaborator(u)} className='my-auto'/>
                          </div>
                      ))}
              </div>
            </div>
        </Modal>
  )
}

export default CollaboratorModal
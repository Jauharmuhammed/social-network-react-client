import Button from "components/Button";
import Collections from "features/users/components/Collections";
import CreatedPosts from "features/users/components/CreatedPosts";
import EditProfile from "features/users/components/EditProfile";
import UserDetails from "features/users/components/UserDetails";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [showCreated, setShowCreated] = useState(true)
    const [showSaved, setShowSaved] = useState(false)
    const [edit, setEdit] = useState(false)

    function handlePills() {
      setShowCreated(prev => !prev)
      setShowSaved(prev => !prev)
    }

    return (
        <>
            <UserDetails username={username} edit={edit} setEdit={setEdit}/>
            {!edit &&<>
              <div className="flex justify-center md:justify-start gap-5 md:ml-3 py-4 md:py-8">
                <Button onClick={handlePills } white className={`${showCreated && 'bg-white text-darkgray'}`} text='Created' />
                <Button onClick={handlePills } white className={`${showSaved && 'bg-white text-darkgray'}`} text='Saved' />
              </div>
              {showCreated && <CreatedPosts username={username} />}
              {showSaved && <Collections username={username} />}
            </>}
            {edit && <EditProfile/>}
        </>
    );
};

export default Profile;

import Button from "components/Button";
import { Layout } from "components/Layout";
import CreatedPosts from "features/users/components/CreatedPosts";
import UserDetails from "features/users/components/UserDetails";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [showCreated, setShowCreated] = useState(true)
    const [showSaved, setShowSaved] = useState(false)

    function handlePills() {
      setShowCreated(prev => !prev)
      setShowSaved(prev => !prev)
    }

    return (
        <Layout>
            <UserDetails username={username} />
            <div className="flex gap-5 ml-3 py-8">
              <Button onClick={handlePills } className={`${showCreated && 'bg-white text-darkgray'}`} text='Created' />
              <Button onClick={handlePills } className={`${showSaved && 'bg-white text-darkgray'}`} text='Saved' />
            </div>
            {showCreated && <CreatedPosts username={username} />}
        </Layout>
    );
};

export default Profile;

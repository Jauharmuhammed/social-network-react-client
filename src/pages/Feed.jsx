import React from 'react'
import Post from "components/Post";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";

const Feed = () => {

  const user = useSelector((state) => state.user.user);

  return (
    <>
   {user && <Layout feed >
      <section className="columns-2 md:columns-3 lg:columns-5 gap-5 mt-28 ">
        <Post imageUrl='https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=890&q=80' title='painting'/>
        <Post imageUrl='https://images.unsplash.com/photo-1487260211189-670c54da558d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' title='Minimal HD white wallpaper'/>
        <Post imageUrl='https://images.unsplash.com/photo-1669544695426-88d5bac4fc3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1669618888359-16e67f0cf56e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cXVvdGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1669756117671-0642b96141ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1667682648363-23606fffa1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfE04alZiTGJUUndzfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1510832842230-87253f48d74f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1669135021171-0a4fcdd52de6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1668030030030-fe496e4cbe77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGFpbnRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1669046638627-4836eb278767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1553374402-559e8b431161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHF1b3Rlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBhaW50aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' title=''/>
        <Post imageUrl='https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhaW50aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' title=''/>
      </section>
    </Layout>}
    </>
  );
};

export default Feed;

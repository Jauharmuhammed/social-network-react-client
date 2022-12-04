import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Feed from "./Feed";
import LandingPage from "./LandingPage";

const Home = () => {
  useEffect(() => {
    const user = useSelector((state) => state.user);
  }, [user]);

  return user ? <Feed /> : <LandingPage />;
};
export default Home;

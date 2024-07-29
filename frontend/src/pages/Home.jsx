import React from "react";

const Home = () => {
  return <div>{localStorage.getItem("userData")}</div>;
};

export default Home;

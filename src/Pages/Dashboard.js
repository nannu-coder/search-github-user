import React from "react";
import { Infos, Navbar, Repos, Search, User } from "../Components/index";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Infos />
      <User />
      <Repos />
    </div>
  );
};

export default Dashboard;

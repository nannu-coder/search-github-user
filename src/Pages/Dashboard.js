import React from "react";
import { Infos, Navbar, Repos, Search, User } from "../Components/index";
import useAppProvider from "../Hooks/useAppProvider";
import loading from "../images/preloader.gif";

const Dashboard = () => {
  const { isLoading } = useAppProvider();

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loading} alt="preloader" className="loading-img" />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Infos />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;

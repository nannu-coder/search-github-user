import { createContext, useEffect, useState } from "react";
import mockFollowers from "../Data/mockFollower";
import mockRepos from "../Data/mockRepos";
import mockUser from "../Data/mockUser";
import axios from "axios";

const AppContext = createContext();

const baseUrl = "https://api.github.com";

const AppProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepo, setGithubRepo] = useState(mockRepos);
  const [follower, setFollower] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios
      .get(`${baseUrl}/users/${user}`)
      .catch((err) => console.log(err));
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      // repos
      axios
        .get(`${baseUrl}/users/${login}/repos?per_page=100`)
        .then((response) => {
          setGithubRepo(response.data);
        });

      //followers
      axios.get(`${followers_url}?per_page=100`).then((response) => {
        setFollower(response.data);
      });
    } else {
      toggleError(true, "NO User Found");
    }

    checkRequests();
    setIsLoading(false);
  };

  const checkRequests = () => {
    axios
      .get(`${baseUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(checkRequests, []);

  return (
    <AppContext.Provider
      value={{
        githubUser,
        githubRepo,
        follower,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

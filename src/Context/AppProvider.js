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

  const checkRequests = () => {
    axios
      .get(`${baseUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(checkRequests, []);

  return (
    <AppContext.Provider value={{ githubUser, githubRepo, follower, requests }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./Context/AppProvider";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import { Auth0Provider } from "@auth0/auth0-react";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,

      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <AppProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        clientId={process.env.REACT_APP_AUTH_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </AppProvider>
  );
}

export default App;

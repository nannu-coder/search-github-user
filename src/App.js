import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./Context/AppProvider";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

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

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;

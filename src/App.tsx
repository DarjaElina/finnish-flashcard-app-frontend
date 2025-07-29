import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Saved from "./components/Saved";
import CreateCard from "./components/CreateCard";
import Root from "./components/Root";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cards",
          element: <Cards />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/saved",
              element: <Saved />,
            },
            {
              path: "/create",
              element: <CreateCard />,
            },
          ],
        },
        {
          element: <PublicRoute />,
          children: [
            {
              path: "/sign-up",
              element: <SignUpForm />,
            },
            {
              path: "/login",
              element: <LoginForm />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

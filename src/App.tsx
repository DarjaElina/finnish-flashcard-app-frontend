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
import DemoCards from "./components/DemoCards";
import NotFound from "./components/NorFound";

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
            {
              path: "/cards",
              element: <Cards />,
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
            {
              path: "/demo-cards",
              element: <DemoCards />,
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

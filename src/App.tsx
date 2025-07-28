import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Saved from "./components/Saved";
import CreateCard from "./components/CreateCard";
import Root from "./components/Root";

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
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/create",
          element: <CreateCard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

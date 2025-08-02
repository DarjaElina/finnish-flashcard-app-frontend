import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MooseLoader from "./components/MooseLoader/MooseLoader";
import DemoCards from "./pages/DemoCards";
import MooseAndLink from "./components/MooseAndLink/MooseAndLink";
const Home = lazy(() => import("./components/Home/Home"));
const CreateCard = lazy(() => import("./components/CreateCard"));
const Root = lazy(() => import("./components/Root"));
const SignUpForm = lazy(() => import("./components/SignUpForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PublicRoute = lazy(() => import("./components/PublicRoute"));

const AllCards = lazy(() => import("./pages/AllCards/AllCards"));
const SavedCards = lazy(() => import("./pages/SavedCards"));
// const GamePage = lazy(() => import("./pages/GamePage"));

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
            { path: "/saved", element: <SavedCards /> },
            { path: "/create", element: <CreateCard /> },
            { path: "/cards", element: <AllCards /> },
          ],
        },
        {
          element: <PublicRoute />,
          children: [
            { path: "/sign-up", element: <SignUpForm /> },
            { path: "/login", element: <LoginForm /> },
            { path: "/demo", element: <DemoCards /> },
            // { path: "/game", element: <GamePage/> }
          ],
        },
        {
          path: "/*",
          element: (
            <MooseAndLink
              text="Oops! Looks like the page you tried to find is not in our system! Let's get you back home!"
              linkText="Home!"
              url="/"
            />
          ),
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<MooseLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

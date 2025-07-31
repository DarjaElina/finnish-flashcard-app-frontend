import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MooseLoader from "./components/MooseLoader/MooseLoader";
const Home = lazy(() => import("./components/Home/Home"));
const CreateCard = lazy(() => import("./components/CreateCard"));
const Root = lazy(() => import("./components/Root"));
const SignUpForm = lazy(() => import("./components/SignUpForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PublicRoute = lazy(() => import("./components/PublicRoute"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

const DemoCards = lazy(() => import("./pages/DemoCards"));
const AllCards = lazy(() => import("./pages/AllCards"));
const SavedCards = lazy(() => import("./pages/SavedCards"));

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
          ],
        },
        { path: "/*", element: <NotFound /> },
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

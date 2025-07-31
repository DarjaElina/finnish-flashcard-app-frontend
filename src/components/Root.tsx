import { Outlet } from "react-router";
import Header from "./Header/Header";

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

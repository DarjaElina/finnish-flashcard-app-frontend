import { Outlet } from "react-router";
import Header from "./Header";

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

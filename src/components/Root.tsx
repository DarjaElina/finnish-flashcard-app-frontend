import { Outlet } from "react-router";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

import MobileMenu from "../MobileMenu/MobileMenu";
import NavBar from "../NavBar/NavBar";

export default function Header() {
  return (
    <header>
      <nav>
        <MobileMenu />
        <NavBar />
      </nav>
    </header>
  );
}

import { NavLink } from "react-router";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="app-header">
      <div className="header-top">
        <h1>Finnish Flashcards 🇫🇮</h1>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      <nav>
        <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Saved cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Create card
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

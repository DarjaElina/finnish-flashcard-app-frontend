import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/auth";
import { useNavigate } from "react-router";
import { showError } from "../utils/swal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: user } = useAuth();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      showError("Error signing out");
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

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
          {user && (
            <>
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
              <li>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="button-link"
                >
                  {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink
                  to="/demo-cards"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Demo
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign-up"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

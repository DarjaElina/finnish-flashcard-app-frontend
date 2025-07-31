import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./NavLinks.module.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { showError } from "../../utils/swal";

interface NavLinksProp {
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavLinks({ setMenuOpen }: NavLinksProp) {
  const { data: user } = useAuth();
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
    <ul className={styles.navLinks}>
      <Link className={styles.navLink} to="/">
        <h1>Finnish Flashcards</h1>
      </Link>
      <li>
        <NavLink
          to="/"
          className={styles.navLink}
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
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Saved cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Create card
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className={styles.buttonLink}
            >
              Sign Out
            </button>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <NavLink
              to="/demo"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Demo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-up"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

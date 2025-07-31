import NavLinks from "../NavLinks/NavLinks";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <NavLinks />
    </div>
  );
}

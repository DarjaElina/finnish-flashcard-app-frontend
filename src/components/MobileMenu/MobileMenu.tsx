import { AlignLeft, AlignRight, X } from "lucide-react";
import NavLinks from "../NavLinks/NavLinks";
import styles from "./MobileMenu.module.css";
import { useState } from "react";
import clsx from "clsx";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <AlignLeft
        className={styles.openSidebar}
        type="button"
        onClick={toggleMenu}
      />

      <div
        className={clsx(styles.overlay, menuOpen && styles.overlayActive)}
        onClick={toggleMenu}
      />

      <div className={clsx(styles.sidebar, menuOpen && styles.sidebarActive)}>
        <X className={styles.closeSidebar} type="button" onClick={toggleMenu} />
        <NavLinks setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
}

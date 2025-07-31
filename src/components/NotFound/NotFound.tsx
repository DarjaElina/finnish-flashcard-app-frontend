import { Link } from "react-router-dom";
import Moose from "../Moose/Moose";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <Moose text="Ooops! Looks like you page you tried to open is not in our system... Let's get you back home!" />
      <Link className={styles.backHome} to="/">
        Home!
      </Link>
    </div>
  );
}

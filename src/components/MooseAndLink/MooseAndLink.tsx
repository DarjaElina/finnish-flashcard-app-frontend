import { Link } from "react-router-dom";
import Moose from "../Moose/Moose";
import styles from './MooseAndLink.module.css';

export default function MooseAndLink({text, linkText, url}: {text: string; linkText: string; url: string}) {
  return (
    <div className={styles.wrapper}>
      <Moose text={text} />
      <Link className={styles.link} to={url}>
        {linkText}
      </Link>
    </div>
  );
}

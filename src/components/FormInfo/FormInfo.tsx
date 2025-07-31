import { Link } from "react-router-dom";
import styles from "./FormInfo.module.css";

interface FormInfoProps {
  question: string;
  action: string;
  url: string;
}

export default function FormInfo({ question, action, url }: FormInfoProps) {
  return (
    <div className={styles.wrapper}>
      <p>{question}</p>
      <Link className={styles.link} to={url}>
        {action}
      </Link>
    </div>
  );
}

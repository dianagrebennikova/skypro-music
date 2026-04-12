import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.code}>404</div>

      <div className={styles.title}>Страница не найдена</div>

      <div className={styles.text}>
        Возможно, она была удалена <br />
        или перенесена на другой адрес
      </div>

      <Link href="/music/main" className={styles.button}>
        Вернуться на главную
      </Link>
    </div>
  );
}
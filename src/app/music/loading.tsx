import styles from "./layout.module.css";

export default function Loading() {
  return (
    <div className={styles.centerblock}>
      <h2 className={styles.content__title}>Загрузка треков...</h2>
    </div>
  );
}
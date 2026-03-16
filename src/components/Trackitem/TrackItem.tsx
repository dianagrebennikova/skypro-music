import styles from "./trackitem.module.css";
import Link from "next/link";

type TrackItemProps = {
  title: string;
  author: string;
  album: string;
  time: string;
  extra?: string;
};

export default function TrackItem({
  title,
  author,
  album,
  time,
  extra,
}: TrackItemProps) {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>

          <div className={styles["track__title-text"]}>
            <Link className={styles.track__titleLink} href="">
              {title}
              <span className={styles.track__titleSpan}>{extra}</span>
            </Link>
          </div>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
          </Link>
        </div>

        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{time}</span>
        </div>
      </div>
    </div>
  );
}
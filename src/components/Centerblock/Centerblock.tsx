import styles from "./centerblock.module.css";
import classnames from "classnames";
import TrackList from "../TrackList/TrackList";
import Filter from "../Filter/Filter";
import { TrackType } from "@/sharedTypes/types";

type centerBlockProp = {
  tracks?: TrackType[];
  isLoading: boolean;
  errorRes: string | null;
  title: string;
};
export default function CenterBlock({
  errorRes,
  isLoading,
  tracks = [],
  title,
}: centerBlockProp) {
  return (
    <>
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {isLoading ? (
            "Загрузка..."
          ) : errorRes ? (
            <div className={styles.error}>{errorRes}</div>
          ) : tracks.length === 0 ? (
            "Нет треков"
          ) : (
            <TrackList tracks={tracks} />
          )}
        </div>
      </div>
    </>
  );
}

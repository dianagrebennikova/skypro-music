"use client";

import { useEffect, useState } from "react";
import styles from "./centerblock.module.css";
import classnames from "classnames";
import TrackList from "../TrackList/TrackList";
import Filter from "../Filter/Filter";
import { getAllTracks } from "@/services/tracks/tracks";
import { TrackType } from "@/sharedTypes/types";
import { useAppDispatch } from "@/store/store";
import { setCurrentPlaylist } from "@/store/features/trackSlice";

export default function CenterBlock() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllTracks().then((data) => {
      setTracks(data.data);
      dispatch(setCurrentPlaylist(data.data));
      setIsLoading(false)
    }) .catch((err) => {
      console.error("Ошибка при загрузке треков:", err);
      setError("Не удалось загрузить треки. Попробуйте позже."); 
    })
    .finally(() => setIsLoading(false));
}, []);

  return (
    <>
      <h2 className={styles.centerblock__h2}>Треки</h2>
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
        {isLoading && <div className={styles.loading}>Загрузка треков...</div>}
        {error && <div className={styles.loading} >{error}</div>}
        {!isLoading && !error && <TrackList tracks={tracks} />} 
        <TrackList tracks={tracks} />
      </div>
    </>
  );
}

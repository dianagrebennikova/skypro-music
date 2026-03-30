"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/components/Centerblock/centerblock.module.css";
import classnames from "classnames";
import TrackList from "@/components/TrackList/TrackList";
import Filter from "@/components/Filter/Filter";
import { getAllTracks, getSelectionById } from "@/services/tracks/tracks";
import { TrackType } from "@/sharedTypes/types";
import { useAppDispatch } from "@/store/store";
import { setCurrentPlaylist } from "@/store/features/trackSlice";

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.id) return;

    const realId = Number(params.id) + 1;

    Promise.all([getSelectionById(realId), getAllTracks()])
      .then(([selectionData, allTracksData]) => {
        if (!selectionData.data) {
          setTitle("Подборка не найдена");
          setTracks([]);
          return;
        }

        setTitle(selectionData.data.name);

        const selectionTrackIds: number[] = selectionData.data.items || [];

        const filteredTracks = allTracksData.data.filter((track) =>
          selectionTrackIds.includes(track._id)
        );

        setTracks(filteredTracks);
        dispatch(setCurrentPlaylist(filteredTracks));
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Ошибка при загрузке треков:", err);
      setError("Не удалось загрузить треки. Попробуйте позже.");
        setTracks([]);
      })
      .finally(() => setIsLoading(false));
  }, [params.id, dispatch]);

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
        {isLoading && <div className={styles.loading}>Загрузка треков...</div>}
        {error && <div className={styles.loading} >{error}</div>} 
        {!isLoading && !error && <TrackList tracks={tracks} />} 
        <TrackList tracks={tracks} />
      </div>
    </>
  );
}

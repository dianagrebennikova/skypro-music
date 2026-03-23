'use client'

import { useEffect, useState } from "react";
import styles from "./centerblock.module.css";
import classnames from "classnames";
import TrackList from "../TrackList/TrackList";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import { getAllTracks } from "@/api/tracks";
import { TrackType } from "@/sharedTypes/types";

export default function CenterBlock() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  
    useEffect(() => {
      getAllTracks().then((data) => {
        setTracks(data.data);
      });
    }, []);
  return (
    <div className={styles.centerblock}>
      <Search />
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
        <TrackList tracks={tracks}/>
      </div>
    </div>
  );
}

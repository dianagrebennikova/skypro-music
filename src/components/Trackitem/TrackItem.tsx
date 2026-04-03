import { TrackType } from "@/sharedTypes/types";
import styles from "./trackitem.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentPlaylist,
  setCurrentTrack,
} from "@/store/features/trackSlice";
import classnames from "classnames";
import { formatTime } from "@/utils/helper";
import { useLikeTrack } from "@/hooks/useLikeTracks";


type TrackItemProps = {
  track: TrackType;
  playlist: TrackType[];
};

export default function TrackItem({ track, playlist }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlay } = useAppSelector((state) => state.tracks);
  const { toggleLike, isLike, errorMsg } = useLikeTrack(track);

  const isCurrent = currentTrack?._id === track._id;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
  };

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrent ? (
              <div
                className={classnames(styles.track__titleSvg, {
                  [styles.active]: isCurrent,
                  [styles.playing]: isCurrent && isPlay,
                })}
              />
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>

          <div className={styles["track__title-text"]}>
            <Link className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>

        <div className={styles.track__time}>
          <svg
            className={classnames(styles.track__timeSvg, {
              [styles.track__timeSvg_active]: isLike,
            })}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
          >
            <use
              xlinkHref={`/img/icon/sprite.svg#${isLike ? "icon-like" : "icon-dislike"}`}
            ></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
        {errorMsg && <div className={styles.error}>{errorMsg}</div>}
      </div>
    </div>
  );
}

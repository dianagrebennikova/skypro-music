"use client";

import styles from "./bar.module.css";
import Link from "next/link";
import classnames from "classnames";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useRef, useEffect, useState } from "react";
import {
  setIsPlay,
  setNextTrack,
  setPreviousTrack,
  togglePlay,
  toggleShuffle,
} from "@/store/features/trackSlice";
import { getTimePanel } from "@/utils/helper";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function Bar() {
  const { currentTrack, isPlay, isShuffle} = useAppSelector((state) => state.tracks);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlay) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    } else {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  }, [isPlay, currentTrack]);

  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  if (!currentTrack) return <></>;

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };
  const onLoadedMetadata = () => {
    setIsLoadedTrack(true);
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const volumeTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
  };

  const onEnded = () => {
    dispatch(setNextTrack());
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
      setCurrentTime(inputTime);
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPreviousTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };
  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        className={styles.audioHidden}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      ></audio>
      <div className={styles.loading}>{isLoadedTrack ? "" : "Загрузка..."}</div>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={() => dispatch(togglePlay())}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? "/img/icon/sprite.svg#icon-pause"
                        : "/img/icon/sprite.svg#icon-play"
                    }
                  />
                </svg>
              </div>
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classnames(
                    isLoop
                      ? styles.player__btnRepeatSvg_active
                      : styles.player__btnRepeatSvg
                  )}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon
                )}
                onClick={onToggleShuffle}
              >
                <svg
                  className={classnames(
                    isShuffle
                      ? styles.player__btnShuffleSvg_active
                      : styles.player__btnShuffleSvg
                  )}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn
                  )}
                  type="range"
                  name="range"
                  min="0"
                  max="100"
                  onChange={volumeTrack}
                />
              </div>
              <div className={styles.time}>
                {getTimePanel(currentTime, duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

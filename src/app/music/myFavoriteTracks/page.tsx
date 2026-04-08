"use client";

import Centerblock from "@/components/Centerblock/Centerblock";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useState, useEffect } from "react";
import { getFavoriteTracks } from "@/services/tracks/tracks";
import { setFavoriteTracks } from "@/store/features/trackSlice";
import { withReauth } from "@/utils/withReAuth";

export default function MyFavoriteTracks() {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);
  const { favoriteTracks, filteredTracks } = useAppSelector(
    (state) => state.tracks
  );

  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);

  useEffect(() => {
    if (!access) {
      setIsLoading(false);
      setErrorRes("Необходима авторизация");
      return;
    }

    setIsLoading(true);
    setErrorRes(null);

    withReauth((token) => getFavoriteTracks(token), access, refresh, dispatch)
      .then((res) => {
        dispatch(setFavoriteTracks(res.data));
      })
      .catch((err) => {
        setErrorRes("Не удалось загрузить мои треки");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [access, refresh, dispatch]);

  return (
    <Centerblock
      errorRes={errorRes}
      tracks={filteredTracks}
      pagePlaylist={favoriteTracks}
      isLoading={isLoading}
      title="Мои треки"
    />
  );
}

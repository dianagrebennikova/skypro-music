import { TrackType } from "@/sharedTypes/types";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useState } from "react";
import { AxiosError } from "axios";
import { withReauth } from "@/utils/withReAuth";
import { addLike, removeLike } from "@/services/tracks/tracks";
import { addLikedTracks, removeLikedTracks } from "@/store/features/trackSlice";

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!access) return setErrorMsg("Нет авторизации");

    if (!track) return;

    setIsLoading(true);
    setErrorMsg(null);

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    withReauth(
      (token) => actionApi(token, track._id),
      access,
      refresh,
      dispatch
    )
      .then(() => {
        dispatch(actionSlice(track));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMsg(error.response.data.message);
          } else if (error.request) {
            setErrorMsg("Произошла ошибка. Попробуйте позже");
          } else {
            setErrorMsg("Неизвестная ошибка");
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};

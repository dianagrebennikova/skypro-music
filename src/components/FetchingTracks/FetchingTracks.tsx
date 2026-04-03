"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { getAllTracks } from "@/services/tracks/tracks";
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setCurrentPlaylist,
} from "@/store/features/trackSlice";
import { AxiosError } from "axios";

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setCurrentPlaylist(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      getAllTracks()
        .then((res) => {
          dispatch(setAllTracks(res.data));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError("Произошла ошибка. Попробуйте позже"));
            } else {
              dispatch(setFetchError("Неизвестная ошибка"));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, [allTracks, dispatch]);
  return <></>;
}

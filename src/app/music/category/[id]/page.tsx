"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSelectionById } from "@/services/tracks/tracks";
import { TrackType } from "@/sharedTypes/types";
import { useAppSelector } from "@/store/store";
import { AxiosError } from "axios";
import Centerblock from "@/components/Centerblock/Centerblock";

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError, filteredTracks } =
    useAppSelector((state) => state.tracks);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getSelectionById(params.id)
        .then((res) => {
          setTitle(res.data.name);
          const tracksId = res.data.items;
          const resultTracks = allTracks.filter((el) =>
            tracksId.includes(el._id)
          );
          setPlaylist(resultTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              setErrorRes(error.response.data);
            } else if (error.request) {
              setErrorRes("Произошла ошибка. Попробуйте позже");
            }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fetchIsLoading, params.id, allTracks]);

  return (
    <Centerblock
      errorRes={errorRes || fetchError}
      tracks={filteredTracks}
      pagePlaylist={playlist}
      isLoading={isLoading}
      title={title}
    />
  );
}

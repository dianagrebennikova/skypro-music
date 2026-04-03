"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTracks, getSelectionById } from "@/services/tracks/tracks";
import { TrackType } from "@/sharedTypes/types";
import { useAppSelector } from "@/store/store";
import { AxiosError } from "axios";
import Centerblock from "@/components/Centerblock/Centerblock";

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks
  );
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const id = params.id ;

  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getSelectionById(id)
        .then((res) => {
          setTitle(res.data.name);  
          const tracksId = res.data.items;
          const resultTracks = allTracks.filter((el) =>
            tracksId.includes(el._id)
          );
          setTracks(resultTracks);
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
  }, [fetchIsLoading]);

  return (
    <Centerblock
      errorRes={errorRes || fetchError}
      tracks={tracks}
      isLoading={isLoading}
      title={title}
    />
  );
}

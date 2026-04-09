"use client";

import Centerblock from "@/components/Centerblock/Centerblock";

import { useAppSelector } from "@/store/store";

export default function Home() {
  const { allTracks, fetchIsLoading, fetchError, filteredTracks } =
    useAppSelector((state) => state.tracks);

  return (
    <Centerblock
      pagePlaylist={allTracks}
      tracks={filteredTracks}
      isLoading={fetchIsLoading}
      errorRes={fetchError}
      title="Треки"
    />
  );
}

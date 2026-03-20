"use client";

import { useEffect, useState } from "react";
import { getAllTracks } from "@/api/tracks";
import { TrackType } from "@/sharedTypes/types";
import TrackItem from "../Trackitem/TrackItem";

export default function TrackList() {
  const [tracks, setTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    getAllTracks().then((data) => {
      setTracks(data.data);
    });
  }, []);

  return (
    <div>
      {tracks.map((track) => (
        <TrackItem key={track._id} track={track} />
      ))}
    </div>
  );
}

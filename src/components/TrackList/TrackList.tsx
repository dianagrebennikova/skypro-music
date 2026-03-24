
import { TrackType } from "@/sharedTypes/types";
import TrackItem from "../Trackitem/TrackItem";

type Props = {
  tracks: TrackType[];
};

export default function TrackList({tracks}: Props) {
  return (
    <div>
      {tracks.map((track) => (
        <TrackItem key={track._id} track={track} />
      ))}
    </div>
  );
}

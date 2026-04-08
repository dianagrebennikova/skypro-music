import { TrackType } from "@/sharedTypes/types";
import { initialStateType } from "@/store/features/trackSlice";

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = state.pagePlaylist;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.authors.includes(track.author)
    );
  }

  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.genres.some((el) => track.genre.includes(el))
    );
  }
  if (state.filters.years === "Сначала новые") {
    filteredPlaylist = [...filteredPlaylist].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  } else if (state.filters.years === "Сначала старые") {
    filteredPlaylist = [...filteredPlaylist].sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  }
  const query = state.filters.searchValue.trim().toLowerCase();
  if (query.length >= 2) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      track.name.toLowerCase().includes(query)
    );
  }
  return filteredPlaylist;
};

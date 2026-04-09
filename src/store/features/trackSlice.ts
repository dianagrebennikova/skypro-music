import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/sharedTypes/types";
import { applyFilters } from "@/utils/applyFilters";

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  pagePlaylist: TrackType[];
  filteredTracks: TrackType[];
  filters: {
    authors: string[];
    genres: string[];
    years: string;
    searchValue: string;
  };
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  pagePlaylist: [],
  filteredTracks: [],
  filters: {
    authors: [],
    genres: [],
    years: "По умолчанию",
    searchValue: "",
  },
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },

    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5
      );
    },

    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },

    togglePlay: (state) => {
      state.isPlay = !state.isPlay;
    },

    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },

    setNextTrack: (state) => {
      if (state.currentTrack) {
        const playlist = state.isShuffle
          ? state.shuffledPlaylist
          : state.playlist;
        const currentTrack = state.currentTrack;
        const curIndex = playlist.findIndex(
          (el) => el._id === currentTrack._id
        );
        if (curIndex === -1 || curIndex === playlist.length - 1) {
          return;
        }

        state.currentTrack = playlist[curIndex + 1];
      }
    },
    setPreviousTrack: (state) => {
      if (state.currentTrack) {
        const playlist = state.isShuffle
          ? state.shuffledPlaylist
          : state.playlist;
        const currentTrack = state.currentTrack;
        const curIndex = playlist.findIndex(
          (el) => el._id === currentTrack._id
        );
        if (curIndex <= 0) {
          return;
        }

        state.currentTrack = playlist[curIndex - 1];
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlatlist: (state, action) => {
      state.pagePlaylist = action.payload;

      state.filteredTracks = applyFilters(state);
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;

      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => {
          return el != author;
        });
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;
      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => {
          return el != genres;
        });
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterYear: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;

      state.filteredTracks = applyFilters(state);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.filters.searchValue = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {
        authors: [],
        genres: [],
        years: "По умолчанию",
        searchValue: "",
      };
      state.filteredTracks = applyFilters(state);
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  togglePlay,
  setCurrentPlaylist,
  setNextTrack,
  setPreviousTrack,
  toggleShuffle,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthors,
  setPagePlatlist,
  setFilterGenres,
  setFilterYear,
  setSearchValue,
  clearFilters,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

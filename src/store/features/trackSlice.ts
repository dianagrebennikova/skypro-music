import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/sharedTypes/types";

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
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
        const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
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
        const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
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
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

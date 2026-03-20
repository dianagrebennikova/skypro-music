import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "@/sharedTypes/types";

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.isPlay = true;
    },

    setIsPlay:(state, action: PayloadAction<boolean>)=>{
      state.isPlay=action.payload;
    },

    togglePlay: (state) => {
      state.isPlay = !state.isPlay;
    },
  },
});

export const { setCurrentTrack, setIsPlay, togglePlay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

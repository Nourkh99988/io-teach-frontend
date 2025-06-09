import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliderData } from "@/types/slider";

interface SliderState {
  sliders: SliderData[];
}

const initialState: SliderState = {
  sliders: [],
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSliders: (state, action: PayloadAction<SliderData[]>) => {
      state.sliders = action.payload;
    },
  },
});

export const { setSliders } = sliderSlice.actions;

export default sliderSlice.reducer;

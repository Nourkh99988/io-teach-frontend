import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, Services } from "@/types/navbar";

// قيمة أولية فعلية
const initialState: Services = {
  services: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    clearServices: (state) => {
      state.services = [];
    },
  },
});

export const { setServices, clearServices } = servicesSlice.actions;

export default servicesSlice.reducer;

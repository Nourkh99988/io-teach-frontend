import { configureStore } from "@reduxjs/toolkit";
import { servicesSlice } from "./slices/servicesSlice";
import { sliderSlice } from "./slices/sliderSlice";
import { teamSlice } from "./slices/teamslice";
import { clientSlice } from "./slices/ClientsSlice";

export const store = configureStore({
  reducer: {
    services: servicesSlice.reducer,
    slider: sliderSlice.reducer,
    team: teamSlice.reducer,
    clients: clientSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

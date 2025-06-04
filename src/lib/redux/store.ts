// lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { servicesSlice } from "./slices/servicesSlice";

// هنا تضيف الـ reducers لاحقاً
export const store = configureStore({
  reducer: {
    // exampleSlice: exampleReducer
    services: servicesSlice.reducer,
  },
});

// أنواع TypeScript للمستقبل
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

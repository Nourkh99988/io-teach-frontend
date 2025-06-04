"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";

export function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function useHydrateRedux<T>(data: T, setDataAction: (payload: T) => { type: string; payload: T }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      dispatch(setDataAction(data));
    }
  }, [data, dispatch, setDataAction]);
}

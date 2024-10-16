import { create } from "zustand";

export const useFetchStatusStore = create((set) => ({
  isFetching: false,
  setIsFetching: (fetching: { isFetching: boolean }) =>
    set({ isFetching: fetching }),
}));

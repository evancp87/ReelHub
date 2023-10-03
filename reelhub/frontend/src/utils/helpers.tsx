import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const filterData = (data, search) => {
  return data
    ? data.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];
};

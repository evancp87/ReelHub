import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Media } from "@/store/services/types";
export const filterData = (data: Media[], search: string) => {
  return data
    ? data.filter((data: Media) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];
};

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./services/usersSlice";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type BookmarkParams = {
    mediaId: string,
    userId: string
}
export const useIsAuthenticated = () => {
    const user = useAppSelector(selectCurrentUser);
    return user !== null
}

export const useAddBookmark = (mediaId:BookmarkParams, userId:BookmarkParams) => {
    const user = useAppSelector(selectCurrentUser);

    if (!user) {
        return;
    } 
    return {mediaId, userId}
}
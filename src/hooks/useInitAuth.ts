import { getFavoriteTracks } from "@/services/tracks/tracks";
import {
  setAccessToken,
  setRefreshToken,
  setUsername,
  clearUser,
} from "@/store/features/authSlice";
import { setFavoriteTracks } from "@/store/features/trackSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");
      const username = localStorage.getItem("username");

      if (access && refresh && username) {
        dispatch(setAccessToken(access));
        dispatch(setRefreshToken(refresh));
        dispatch(setUsername(username));

        getFavoriteTracks(access)
          .then((res) => {
            dispatch(setFavoriteTracks(res.data));
          })
          .catch((error) => {
            console.error("Ошибка при загрузке избранных треков:", error);
            dispatch(clearUser());
            dispatch(setFavoriteTracks([]));
          });
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("Ошибка инициализации авторизации:", error);
      dispatch(clearUser());
    }
  }, [dispatch]);
};
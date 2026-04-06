import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants/constants";
import { TrackType } from "@/sharedTypes/types";


export async function getAllTracks(): Promise<{ data: TrackType[] }> {
  try {
    const res = await axios.get(`${BASE_URL}/catalog/track/all/`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Неизвестная ошибка при получении треков");
  }
}

export async function getTrackById(_id: number) {
  try {
    const res = await axios.get(`${BASE_URL}/catalog/track/${_id}/`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Неизвестная ошибка при получении трека");
  }
}

export async function getSelectionById(id: string) {
  try {
    const correctedId = Number(id) + 1;

    const res = await axios.get(`${BASE_URL}/catalog/selection/${correctedId}/`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Неизвестная ошибка при получении подборки");
  }
}

export async function addLike(access: string, id: number) {
  try {
    await axios.post(`${BASE_URL}/catalog/track/${id}/favorite/`, {}, {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Ошибка при добавлении в избранное");
  }
}


export async function removeLike(access: string, id: number) {
  try {
    await axios.delete(`${BASE_URL}/catalog/track/${id}/favorite/`,  {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Ошибка при удалении из избранного");
  }
}

export async function getFavoriteTracks(access: string) {
  try {
    const res = await axios.get(
      `${BASE_URL}/catalog/track/favorite/all/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Ошибка при получении избранных треков");
  }
}
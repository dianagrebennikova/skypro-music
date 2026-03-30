import { BASE_URL } from "../constants/constants";
import { TrackType } from "@/sharedTypes/types";


export async function getAllTracks(): Promise<{ data: TrackType[] }> {
    const res = await fetch(`${BASE_URL}/catalog/track/all/`);
  
    if (!res.ok) {
      throw new Error("Ошибка при получении треков");
    }
  
    return res.json();
  }

  export async function getTrackById(_id: number) {
    const res = await fetch(`${BASE_URL}/catalog/track/${_id}/`);
  
    if (!res.ok) {
      throw new Error("Ошибка при получении трека");
    }
  
    return res.json();
  }


export async function getSelectionById(id: number) {
  const res = await fetch(`${BASE_URL}/catalog/selection/${id}/`);

  if (!res.ok) {
    throw new Error("Ошибка при получении подборки");
  }

  return res.json();
}
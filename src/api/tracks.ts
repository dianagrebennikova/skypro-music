const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export async function getAllTracks() {
    const res = await fetch(`${BASE_URL}/catalog/track/all/`);
  
    if (!res.ok) {
      throw new Error("Ошибка при получении треков");
    }
  
    return res.json();
  }

  export async function getTrackById(id: number) {
    const res = await fetch(`${BASE_URL}/catalog/track/${id}/`);
  
    if (!res.ok) {
      throw new Error("Ошибка при получении трека");
    }
  
    return res.json();
  }
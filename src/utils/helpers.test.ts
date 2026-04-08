import { data } from "@/data";
import { formatTime, getUniqueValuesByKey, getTimePanel } from "./helper";

describe("formatTime", () => {
  it("Добавление нуля если секунд < 10", () => {
    expect(formatTime(61)).toBe("1:01");
  });
  it("Форматирует время меньше минуты", () => {
    expect(formatTime(35)).toBe("0:35");
  });
  it("Отрабатывает 0 секунд", () => {
    expect(formatTime(0)).toBe("0:00");
  });
});

describe("getUniqueValuesByKey", () => {
  it("Возвращает уникальный альбом", () => {
    const albums = getUniqueValuesByKey(data, "album");
    expect(albums).toContain("Chase");
    const uniqueAlbums = Array.from(new Set(albums));
    expect(albums).toEqual(uniqueAlbums);
  });
  it("Возвращает уникальные жанры", () => {
    const genres = getUniqueValuesByKey(data, "genre");
    expect(genres).toContain("Классическая музыка");
    const uniqueGenres = Array.from(new Set(genres));
    expect(genres).toEqual(uniqueGenres);
  });
});

describe("getTimePanel", () => {
  it("Возвращает Строку текущего и общего времени", () => {
    const currentTime = 65;
    const totalTime = 350;
    const result = getTimePanel(currentTime, totalTime);
    expect(result).toBe("1:05 / 5:50");
  });
  it("Возвращает undefined, если totalTime не задан", () => {
    const currentTime = 50;
    const result = getTimePanel(currentTime, undefined);
    expect(result).toBeUndefined();
  });
});

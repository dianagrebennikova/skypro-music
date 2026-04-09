import { initialStateType } from "@/store/features/trackSlice";
import { applyFilters } from "./applyFilters";
import { data } from "@/data";

describe("applyFilters", () => {
  const baseState: initialStateType = {
    currentTrack: null,
    isPlay: false,
    playlist: [],
    shuffledPlaylist: [],
    isShuffle: false,
    allTracks: [],
    favoriteTracks: [],
    fetchError: null,
    fetchIsLoading: false,
    pagePlaylist: data,
    filteredTracks: [],
    filters: {
      authors: [],
      genres: [],
      years: "По умолчанию",
      searchValue: "",
    },
  };

  it("Фильтр по авторам", () => {
    const state = {
      ...baseState,
      filters: { ...baseState.filters, authors: ["Frank Schroter"] },
    };
    const result = applyFilters(state);
    expect(result.every((track) => track.author === "Frank Schroter")).toBe(
      true
    );
  });

  it("Фильтр по жанрам", () => {
    const state = {
      ...baseState,
      filters: { ...baseState.filters, genres: ["Классическая музыка"] },
    };
    const result = applyFilters(state);
    expect(
      result.every((track) => track.genre.includes("Классическая музыка"))
    ).toBe(true);
  });

  it("фильтр по году выпуска", () => {
    const state = {
      ...baseState,
      filters: { ...baseState.filters, years: "Сначала старые" },
    };
    const result = applyFilters(state);
    for (let i = 0; i < result.length - 1; i++) {
      expect(new Date(result[i].release_date).getTime()).toBeLessThanOrEqual(
        new Date(result[i + 1].release_date).getTime()
      );
    }
  });
  it("Фильтрует по поисковому запросу", () => {
    const state = {
      ...baseState,
      filters: { ...baseState.filters, searchValue: "chase" },
    };
    const result = applyFilters(state);
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((track) => track.name.toLowerCase().includes("chase"))
    ).toBe(true);
  });
  it("Фильтрует по автору, жанру и поиску одновременно", () => {
    const state = {
      ...baseState,
      filters: {
        authors: ["Alexander Nakarada"],
        genres: ["Классическая музыка"],
        years: "Сначала новые",
        searchValue: "chase",
      },
    };
    const result = applyFilters(state);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Chase");
  });
});

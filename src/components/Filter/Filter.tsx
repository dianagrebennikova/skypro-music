"use client";

import styles from "./filter.module.css";
import { useState } from "react";
import FilterItem from "../FilterItem/FilterItem";
import { getUniqueValuesByKey } from "@/utils/helper";
import { TrackType } from "@/sharedTypes/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYear,
} from "@/store/features/trackSlice";
import classNames from "classnames";

type filterProps = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: filterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const authors = getUniqueValuesByKey(tracks, "author");
  const genres = getUniqueValuesByKey(tracks, "genre");

  const dispatch = useAppDispatch();

  const selectedAuthors = useAppSelector(
    (state) => state.tracks.filters.authors
  );

  const selectedGenres = useAppSelector((state) => state.tracks.filters.genres);

  const selectedYear = useAppSelector((state) => state.tracks.filters.years);

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const onSelectYear = (year: string) => {
    dispatch(setFilterYear(year));
  };
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItem
        name="author"
        label="исполнителю"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedValues={selectedAuthors}
      >
        {authors.map((a) => (
          <div
            key={a}
            onClick={() => onSelectAuthor(a)}
            className={classNames(styles.item, {
              [styles.selected]: selectedAuthors.includes(a),
            })}
          >
            {a}
          </div>
        ))}
      </FilterItem>

      <FilterItem
        name="year"
        label="году выпуска"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedValues={selectedYear !== "По умолчанию" ? [selectedYear] : []}
      >
        <div
          className={classNames(styles.item, {
            [styles.selected]: selectedYear === "По умолчанию",
          })}
          onClick={() => onSelectYear("По умолчанию")}
        >
          По умолчанию
        </div>
        <div
          className={classNames(styles.item, {
            [styles.selected]: selectedYear === "Сначала новые",
          })}
          onClick={() => onSelectYear("Сначала новые")}
        >
          Сначала новые
        </div>
        <div
          className={classNames(styles.item, {
            [styles.selected]: selectedYear === "Сначала старые",
          })}
          onClick={() => onSelectYear("Сначала старые")}
        >
          Сначала старые
        </div>
      </FilterItem>

      <FilterItem
        name="genre"
        label="жанру"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedValues={selectedGenres}
      >
        {genres.map((g) => (
          <div
            key={g}
            onClick={() => onSelectGenre(g)}
            className={classNames(styles.item, {
              [styles.selected]: selectedGenres.includes(g),
            })}
          >
            {g}
          </div>
        ))}
      </FilterItem>
    </div>
  );
}

'use client'

import styles from "./filter.module.css";
import { useState } from "react";
import FilterItem from "../FilterItem/FilterItem";
import { getUniqueValuesByKey } from "@/utils/helper";
import { TrackType } from "@/sharedTypes/types";

type Props = {
  tracks: TrackType[];
};
export default function Filter({ tracks }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const authors = getUniqueValuesByKey(tracks, "author");
  const genres = getUniqueValuesByKey(tracks, "genre");
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        name="author"
        label="исполнителю"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      >
        {authors.map((a) => (
          <div key={a}>{a}</div>
        ))}
      </FilterItem>
      <FilterItem
        name="year"
        label="году выпуска"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      >
        <div>По умолчанию</div>
        <div>Сначала новые</div>
        <div>Сначала старые</div>
      </FilterItem>
      <FilterItem
        name="genre"
        label="жанру"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      >
        {genres.map((g) => (
          <div key={g}>{g}</div>
        ))}
      </FilterItem>
    </div>
  );
}

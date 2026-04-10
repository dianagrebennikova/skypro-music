"use client";

import styles from "./search.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSearchValue } from "@/store/features/trackSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(
    (state) => state.tracks.filters.searchValue
  );

  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchValue(value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchValue}
        onChange={onSearchInput}
        
      />
    </div>
  );
}

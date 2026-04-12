"use client";

import styles from "./navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearUser } from "@/store/features/authSlice";
import { setFavoriteTracks } from "@/store/features/trackSlice";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { username } = useAppSelector((state) => state.auth);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = useCallback(() => {
    dispatch(clearUser());
    dispatch(setFavoriteTracks([]));

    router.push("/music/main");
  }, [dispatch, router]);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src={theme === "light" ? "/img/logo_modal.png" : "/img/logo.png"}
            alt={"logo"}
            loading="eager"
          />
        </Link>
      </div>
      <div className={styles.nav__burger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div className={`${styles.nav__menu} ${isOpen ? styles.active : ""}`}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          {username && (
            <li className={styles.menu__item}>
              <Link
                href="/music/myFavoriteTracks"
                className={styles.menu__link}
              >
                Мои треки
              </Link>
            </li>
          )}
          <li className={styles.menu__item}>
            {username ? (
              <button onClick={handleLogout} className={styles.menu__link}>
                Выйти
              </button>
            ) : (
              <Link href="/auth/signin" className={styles.menu__link}>
                Войти
              </Link>
            )}
          </li>
          <li className={styles.menu__item}>
            <button onClick={toggleTheme} className={styles.menu__link}>
              <Image
                className={styles.sidebar__img}
                src={theme === "light" ? "/img/icon/dark_theme.svg" : "/img/icon/Theme.svg"}
                alt="theme"
                width={39}
                height={39}
                loading="eager"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

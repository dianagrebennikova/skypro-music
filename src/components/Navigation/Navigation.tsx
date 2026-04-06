"use client";

import styles from "./navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  clearUser
} from "@/store/features/authSlice";
import { setFavoriteTracks } from "@/store/features/trackSlice";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { username } = useAppSelector((state) => state.auth);

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
            src="/img/logo.png"
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
        </ul>
      </div>
    </nav>
  );
}

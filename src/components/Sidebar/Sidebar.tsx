'use client'

import styles from "./sidebar.module.css";
import Link from 'next/link'
import Image from 'next/image'; 
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { clearUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { setFavoriteTracks } from "@/store/features/trackSlice";


export default function Sidebar(){
    const dispatch = useAppDispatch()
  const router = useRouter();

  const username = useAppSelector(state => state.auth.username);

  const handleLogout = () => {
dispatch(clearUser())
 dispatch(setFavoriteTracks([])); 
    router.push("/auth/signin");
  }
    return(
        <div className={styles.main__sidebar}>
        <div className={styles.sidebar__personal}>
          <p className={styles.sidebar__personalName}>{username || "Гость"}</p>
          <div className={styles.sidebar__icon} onClick={handleLogout} >
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </div>
        <div className={styles.sidebar__block}>
          <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/1">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist01.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                  loading="eager"
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/2">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist02.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                  loading="eager"
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/3">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist03.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                  loading="eager"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}
'use client'

import styles from "./sidebar.module.css";
import Link from 'next/link'
import Image from 'next/image'; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Sidebar(){
  const[username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if(storedUsername){
      setUsername(storedUsername)
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    router.push("/auth/singin");
  }
    return(
        <div className={styles.main__sidebar}>
        <div className={styles.sidebar__personal}>
          <p className={styles.sidebar__personalName}>{username || ""}</p>
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
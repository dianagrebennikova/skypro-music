import { ReactNode } from "react";
import styles from "./layout.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import Search from "@/components/Search/Search";

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Navigation />
            <div className={styles.centerblock}>
              <Search />
              {children}
            </div>
            <Sidebar />
          </main>
          <Bar />
          <footer className={styles.footer}></footer>
        </div>
      </div>
    </>
  );
}

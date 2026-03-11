
import Link from 'next/link'
import './page.css';
import styles from './page.module.css'
import Navigation from '@/components/Navigation/Navigation';
import Centerblock from '@/components/Centerblock/Centerblock'
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={'container'}>
        <main className={'main'}>
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
}

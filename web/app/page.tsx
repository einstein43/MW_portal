import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/multiway.svg"
          alt="Multiway IT logo"
          width={540}
          height={114}
          priority
        />
        
        <h1 className={styles.title}>Welkom in het klantenportaal</h1>
        <p className={styles.description}>
          De plek voor alles wat betreft jouw nieuwe website
        </p>

        <div className={styles.ctas}>
          <Link href="/login" className={styles.primary}>
            Login
          </Link>
          <Link href="/dashboard" className={styles.secondary}>
            Dashboard
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://multiwayit.com" target="_blank" rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          ga naar Multiwayit.com →
        </a>
      </footer>
    </div>
  );
}

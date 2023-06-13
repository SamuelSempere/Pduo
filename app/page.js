import styles from './page.module.css'
import Image from 'next/image'



export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <Image fill src='/park1.jpg'></Image>
      </div>
    </main>
  )
}

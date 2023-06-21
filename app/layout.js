'use client'
import './globals.css'
import styles from './page.module.css'
import Image from 'next/image'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Login from './components/login'
import BurgerMenu from './components/menu'


export default function RootLayout({ children }) {


  return (<UserProvider>
    
    <html lang="es">
      <head><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCziTRCAS24xZAsN9cjqhI4w_oUE8velIw&libraries=places&callback=Function.prototype" defer></script>
      </head>
      <body>
        <header className={styles.header}>
        <div className={styles.logo}>
        <Image priority src='/logo-parkiduo.png'
        width={300}
        height={84}
        alt='logo'>
        </Image>
        </div>
        <div>
        <Login/>
        </div>
          <BurgerMenu/>
        </header>
        <div className="page-wrap" id="page-wrap">
                  {children}
        </div>
      </body>
    </html>
    </UserProvider>
    
  )
}

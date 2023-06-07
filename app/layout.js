'use client'
import './globals.css'
import styles from './page.module.css'


import Image from 'next/image'
import Link from 'next/link'
import { slide as Menu, handleOnClose } from 'react-burger-menu'
const links = [
  {
    label: 'Inicio',
    route: '/'
  }, {
    label: 'Parker',
    route: '/parker'
  }, {
    label: 'Driver',
    route: '/driver'
  },
  {
    label: 'FAQ',
    route: '/faq'
  },
  {
    label: 'Conacto',
    route: '/contacto'
  },
]

var styles_menu = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: '93px'
  },
  bmMenu: {
    background: '#b4c4bb',
    padding: '2.5em 1.5em 0',
    fontSize: '2.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#fff',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: '93px'
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCziTRCAS24xZAsN9cjqhI4w_oUE8velIw&libraries=places&callback=Function.prototype" defer></script>
      </head>
      <body>
        <header className={styles.header}>
        <div className={styles.logo}>
        <Image src='/logo-parkiduo.png'
        fill={true}
        alt='logo'>
        </Image>
        </div>
          <Menu styles={styles_menu} itemListElement="div" right pageWrapId={"page-wrap"}>
            <nav>
              {links.map(({ label, route }) => (
                <div key={route}><Link href={route} onClick={(e) => handleOnClose }>{label}</Link></div>
              ))}
            </nav>
          </Menu>
        </header>
        <div className="page-wrap" id="page-wrap">
          {children}
        </div>
      </body>
    </html>
  )
}

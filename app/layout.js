'use client'
import './globals.css'
import React, { useState } from "react";
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'




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
    label: 'Mi cuenta',
    route: '/myaccount'
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
    padding: '1.5em 0.5em 0',
    fontSize: '2.3em'
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
  bmItem_div: {
    padding: '10px 0px'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: '93px'
  }
}


export default function RootLayout({ children }) {

  const [isOpen, setOpen] = useState(false)

  const handleIsOpen = () => {
    setOpen(!isOpen)
  }
  
  const closeSideBar = () => {
    setOpen(false)
  }


  return (
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
          <Menu 
          isOpen={isOpen}
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
          styles={styles_menu} 
          itemListElement="div" 
          right 
          pageWrapId={"page-wrap"}>
            <nav>
              {links.map(({ label, route }) => (
                <div className={styles.bmItem_div} key={route}><Link onClick={closeSideBar} href={route}>{label}</Link></div>
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

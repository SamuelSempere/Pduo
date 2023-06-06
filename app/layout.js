'use client'
import './globals.css'

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
    label: 'Conacto',
    route: '/contacto'
  },
]

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
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
    height: '100%'
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
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCziTRCAS24xZAsN9cjqhI4w_oUE8velIw&libraries=places&callback=Function.prototype" defer></script>
      </head>
      <body>
        <header>
          <Menu styles={styles} itemListElement="div" left pageWrapId={"page-wrap"}>
            <nav>
              {links.map(({ label, route }) => (
                <div><Link key={route} href={route}>{label}</Link></div>
              ))}
            </nav>
          </Menu>
        </header>
        <div class="page-wrap" id="page-wrap">
          {children}
        </div>
      </body>
    </html>
  )
}

'use client'
import './globals.css'

import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'
const links = [
  {
    label: 'Inicio',
    route: '/'
  },{
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
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
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
          <Menu styles={ styles } right pageWrapId={"page-wrap"}>
            <nav>
              <ul>
                {links.map(({ label, route }) => (
                  <li key={route}>
                    <Link href={route}>{label}</Link>
                  </li>
                ))}
              </ul>
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

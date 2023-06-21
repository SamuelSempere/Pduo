

import { slide as Menu } from 'react-burger-menu'
import styles from './../page.module.css'
import Link from 'next/link'
import React, { useState } from "react";


export default function BurgerMenu() {

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
          label: 'Contacto',
          route: '/contacto'
        },
      ]

      const [isOpen, setOpen] = useState(false)

      const handleIsOpen = () => {
        setOpen(!isOpen)
      }
      
      const closeSideBar = () => {
        setOpen(false)
      }
    
        return( 
        <Menu
          isOpen={isOpen}
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
          styles={styles_menu} 
          right
          //itemListElement={'div'} 
          //pageWrapId={"page-wrap"}
          >
            <nav>
              {links.map(({ label, route }) => (
                <div className={styles.bmItem_div} key={route}><Link onClick={closeSideBar} href={route}>{label}</Link></div>
              ))}
            </nav>
          </Menu>
    );
  }
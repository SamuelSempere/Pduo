'use client'
import styles from './../page.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation'

export default function Login() {


  const router = useRouter()
  const { user } = useUser();


return (  
  user ? 
  <div>
      <style jsx>{`
            .logout {
              position: fixed;
              right: 100px;
              top: 28px;
              border-radius: 100%;
              width: 45px;
              height: 45px;
              background-image: url(${user.picture});
              background-size: contain;
              border-width: 1px;
              border-color: #b4b4b4;
              cursor: pointer;
            }
          `}</style>
      <button className="logout" onClick={() => router.push('/myaccount')}></button>
  </div>
  :  <button className={styles.loginButton}><a href="/api/auth/login">Login</a></button>
)
}
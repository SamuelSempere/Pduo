import styles from './../page.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Login() {
  const { user, error, isLoading } = useUser();
return (
  user ? 
  <button className={styles.loginButton}><a href="/api/auth/logout">Logout</a> </button>
  :  <button className={styles.loginButton}><a href="/api/auth/login">Login</a></button>
)
}
import React from 'react'
import styles from './Loginpage.module.css'

export const Loginpage = () => {
  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self')
  } 
  const localLogin = () => {
    window.open('http://localhost:3000/auth/local', '_self')
  } 
  
  return (
    <div>
      Loginpage
      <div className={styles.loginButton}>
        <button onClick={googleLogin}>Login with Google</button>
        <button onClick={localLogin}>Login with password</button>
      </div>  
    </div>
  )
}

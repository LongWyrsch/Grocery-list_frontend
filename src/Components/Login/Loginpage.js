import React from 'react'
import styles from './Loginpage.module.css'

export const Loginpage = () => {
  return (
    <div>
      Loginpage
      <div className={styles.loginButton}>
        <button>Login with Google</button>
      </div>  
    </div>
  )
}

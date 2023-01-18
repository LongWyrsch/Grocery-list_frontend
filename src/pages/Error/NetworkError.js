import React from 'react'
import styles from './NetworkError.module.css'

export const NetworkError = () => {
  return (
    <div className={styles.errorPage}>
        <div className={`card-flat ${styles.messageBox}`}>
            <div className={styles.title}>
                Network Error !
            </div>
            <div className={styles.message}>
                Please check your connection and reload the browser.
            </div>
        </div>
    </div>
  )
}

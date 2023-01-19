import React from 'react'
import styles from './ErrorMessage.module.css'

export const ErrorMessage = ({title, message}) => {
  return (
    <div className={styles.errorPage}>
        <div className={`card-flat ${styles.messageBox}`}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.message}>
                {message}
            </div>
        </div>
    </div>
  )
}

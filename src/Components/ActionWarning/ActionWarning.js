import React from 'react'
import { Button } from '../Button/Button'
import styles from './ActionWarning.module.css'

export const ActionWarning = ({action, message, handleOnClick, handleCancel, iconName}) => {
  return (
    <div className={`card-flat ${styles.warningwindow}`}>
        <div className={`generalText ${styles.message}`}>{message}</div>
          <Button 
              buttonStyle = 'filled'
              text = 'Cancel'
              onClick={handleCancel}
              width = '120px'
          />
            <Button 
                buttonStyle = 'text'
                text = {action}
                onClick={handleOnClick}
                iconInfo = {{iconName: iconName, size:'1.5rem'}}
                width = '120px'
            />
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

export const Login = () => {
  const navigate = useNavigate()

  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self')
  } 
  const localLogin = () => {
    navigate('/locallogin')
    // window.open('http://localhost:3001/loginlocal', '_self')
  } 
  const localRegister = () => {
    navigate('/localregister')
    // window.open('http://localhost:3001/loginlocal', '_self')
  } 
  
  return (
    <div>
      Loginpage
      <div className={styles.loginButton}>
        <button onClick={googleLogin}>Login with Google</button>
        <button onClick={localLogin}>Login with password</button>
        <button onClick={localRegister}>Register with password</button>
      </div>  
    </div>
  )
}

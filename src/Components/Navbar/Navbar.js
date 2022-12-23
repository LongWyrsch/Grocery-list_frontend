import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <ul className={styles.navbar}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    </div>
  )
}

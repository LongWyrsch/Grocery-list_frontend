import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

export const Navbar = () => {

  const {t, i18n} = useTranslation();

  function pickLanguage (lang) {
    i18n.changeLanguage(lang)
    //All displayed text within t function => {t('Text here')}
  }

  return (
    <div>
        <ul className={styles.navbar}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/lists'>Lists</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
        <button onClick={() => pickLanguage('de')}>DEU</button>
        <button onClick={() => pickLanguage('en')}>ENG</button>
        <button onClick={() => pickLanguage('fr')}>FRA</button>
    </div>
  )
}

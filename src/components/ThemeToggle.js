import ThemeToggleSVG from './ThemeToggleSVG'
import styles from './ThemeToggle.module.css'
import { useState } from 'react'

export default function Themetoggle() {
    const [DarkTheme, setDarkTheme] = useState()
    const ToggleTheme = () => {
        const WHITE = '#fff'
        const BLACK = '#000'
        document.documentElement.style.setProperty('--main-color', DarkTheme ? WHITE : BLACK)
        document.documentElement.style.setProperty('--second-color', DarkTheme ? BLACK : WHITE)
        setDarkTheme(!DarkTheme)
    }

    return (
        <button className={styles.toggleBtn} onClick={ToggleTheme}>
            <ThemeToggleSVG></ThemeToggleSVG>
        </button>
    )
}

import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import './header.css'

const ThemeButton = () => {
    const themeState = useContext(ThemeContext);

    const changeTheme = () => {
        if(themeState.theme === "light"){
            themeState.setTheme("dark");
        } else{
            themeState.setTheme("light");
        }
    }

    console.log("here", themeState)
  return (
    <div>
      <button
        onClick={changeTheme}
        className={`button-${themeState.theme}`}
        >Change Theme
        </button>
    </div>
  );
}

export default ThemeButton;

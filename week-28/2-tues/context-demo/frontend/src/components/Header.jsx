import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import './header.css'
const Header = () => {
    const themeState = useContext(ThemeContext)
  return (
    <div>
      <h1 className={themeState.theme}>Hello World</h1>
    </div>
  );
}

export default Header;

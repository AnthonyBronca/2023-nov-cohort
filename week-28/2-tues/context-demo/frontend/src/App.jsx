import { useState } from 'react'
import ThemeContext from './context/ThemeContext';
import Header from './components/Header';
import ThemeButton from './components/ThemeButton';

function App() {
  const [theme, setTheme] = useState("light");

  if(theme === "light"){
    document.body.style.background = "white"
  } else {
    document.body.style.background = "black"
  }

  return (
    <>
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Header />
      <ThemeButton />
    </ThemeContext.Provider>
    </>
  )
}

export default App

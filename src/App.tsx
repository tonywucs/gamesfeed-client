import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Redirect from './pages/Redirect'
// import UserDashboard from './pages/UserDashboard'
import Header from './components/Header/Header'
import SideNav from './components/SideNav/SideNav'
import Form from './components/Form/Form'

import './App.scss'
import AccountSetup from './components/AccountSetup/AccountSetup'

function App() {

  const [toggleSideNav, setToggleSideNav] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  const [togglePrefModal, setTogglePrefModal] = useState(false);
  
  const handleTogglePrefs = () => {
    setTogglePrefModal(!togglePrefModal);
  }
  const handleToggleSideNav = () => {
    setToggleSideNav(!toggleSideNav);
  }

  const handleToggleDarkMode = () => {
    setToggleDarkMode(!toggleDarkMode);
  }

  return (
    <div className={toggleDarkMode ? "dark" : ""}>
      <BrowserRouter>
        <Header handleToggleSideNav={handleToggleSideNav} handleToggleDarkMode={handleToggleDarkMode} toggleDarkMode={toggleDarkMode}/>
        <SideNav toggleSideNav={toggleSideNav} handleToggleSideNav={handleToggleSideNav} />
        <Routes>
          <Route path='/' element={<Homepage togglePrefModal={togglePrefModal} handleTogglePrefs={handleTogglePrefs} toggleDarkMode={toggleDarkMode}/>} />
          {/* <Route path='/news' element={<UserDashboard />} /> */}
          <Route path='/signup' element={<Form toggleDarkMode={toggleDarkMode} />} />
          <Route path='/login' element={<Form toggleDarkMode={toggleDarkMode} />} />
          <Route path='/setup' element={<AccountSetup handleTogglePrefs={handleTogglePrefs} />} />
          <Route path='*' element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App

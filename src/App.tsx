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

  const handleToggleSideNav = () => {
    setToggleSideNav(!toggleSideNav);
  }

  return (
    <BrowserRouter>
      <Header handleToggleSideNav={handleToggleSideNav} />
      <SideNav toggleSideNav={toggleSideNav} handleToggleSideNav={handleToggleSideNav} />
      <Routes>
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/news' element={<UserDashboard />} /> */}
        <Route path='/signup' element={<Form />} />
        <Route path='/login' element={<Form />} />
        <Route path='/setup' element={<AccountSetup />} />
        <Route path='*' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

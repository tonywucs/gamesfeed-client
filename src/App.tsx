import { useState } from 'react'
import './App.scss'
import NewsFeed from './pages/NewsFeed'

function App() {
  const [galleryView, setGalleryView] = useState(false)

  return (
    <>
    <NewsFeed />
    </>
  )
}

export default App

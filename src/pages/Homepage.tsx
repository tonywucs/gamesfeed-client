import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewsArticleGallery from "../components/NewsArticleGallery/NewsArticleGallery";
import '../App.scss';
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";
// import SideNav from "../components/SideNav/SideNav";

const Homepage = ({toggleDarkMode}: any) => {

  const [togglePrefModal, setTogglePrefModal] = useState(false);
  const navigate = useNavigate();

  const handleTogglePrefs = () => {
    setTogglePrefModal(!togglePrefModal);
    navigate('/');
  }

  return (
    <main className={`h-full`}>
      <NewsArticleGallery handleTogglePrefs={handleTogglePrefs} toggleDarkMode={toggleDarkMode}/>
      {togglePrefModal && <PreferenceModal handleTogglePrefs={handleTogglePrefs}/>}
    </main>
  );
};

export default Homepage;
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import NewsArticleGallery from "../components/NewsArticleGallery/NewsArticleGallery";
import '../App.scss';
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";
// import SideNav from "../components/SideNav/SideNav";

const Homepage = ({toggleDarkMode, togglePrefModal, handleTogglePrefs}: any) => {

  return (
    <main className={`h-full dark:bg-stone-900`}>
      <NewsArticleGallery handleTogglePrefs={handleTogglePrefs} toggleDarkMode={toggleDarkMode}/>
      {togglePrefModal && <PreferenceModal handleTogglePrefs={handleTogglePrefs}/>}
    </main>
  );
};

export default Homepage;
import NewsArticleGallery from "../components/NewsArticleGallery/NewsArticleGallery";
import '../App.scss';
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";
import SideNav from "../components/SideNav/SideNav";

const Homepage = () => {

  return (
    <main className="bg-stone-900 h-full">
      <NewsArticleGallery />
      {/* <PreferenceModal /> */}
    </main>
  );
};

export default Homepage;
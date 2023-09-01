import NewsArticleGallery from "../components/NewsArticleGallery/NewsArticleGallery";
import '../App.scss';

const Homepage = () => {

  return (
    <>
      <NewsArticleGallery />
      {/* // Template List View  */}
      {/* <h1 className='page-header'>List View</h1>
      <div className="listView">
        <input type="checkbox" id="cell" className="cell"></input>
        <label htmlFor="cell" className="listView__cell overflow-hidden">
          <div className="listView__face">IGN</div>
          <div className="listView__cellContent">HELLO</div>
        </label>

        <input type="checkbox" id="cell2" className="cell"></input>
        <label htmlFor="cell2" className="listView__cell">IGN</label>
        <input type="checkbox" id="cell"></input>
        <label htmlFor="cell" className="listView__cell">IGN</label>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
        <div className="listView__cell">IGN</div>
      </div> */}

      {/* // Template List View  */}
      {/* <h1 className='page-header'>Grid View</h1>
      <div className="gridView">
        <input type="checkbox" id="cell" className="cell"></input>
        <label htmlFor="cell" className="gridView__cell border-2 border-black">
          <div className="gridView__face">IGN</div>
          <div className="gridView__cellContent">HELLO</div>
        </label>
        <input type="checkbox" id="cell2" className="cell"></input>
        <label htmlFor="cell2" className="gridView__cell">
          <div className="gridView__face">IGN</div>
          <div className="gridView__cellContent">HELLO</div>
        </label>
      </div> */}

      {/* <div className="headlineView">
        <input type="checkbox" id="cell" className="cell"></input>
        <label htmlFor="cell" className="headlineView__feature">
          <div className="headlineView__face">IGN</div>
          <div className="headlineView__cellContent">HELLO</div>
        </label>
        <input type="checkbox" id="cell2" className="cell"></input>
        <label htmlFor="cell2" className="headlineView__cell">
          <div className="headlineView__face">IGN</div>
          <div className="headlineView__cellContent">HELLO</div>
        </label>
        <input type="checkbox" id="cell3" className="cell"></input>
        <label htmlFor="cell3" className="headlineView__cell">
          <div className="headlineView__face">IGN</div>
          <div className="headlineView__cellContent">HELLO</div>
        </label>
      </div> */}
    </>
  );
};

export default Homepage;
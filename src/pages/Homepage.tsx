import { useState } from 'react'

import NewsArticleGallery from "../components/NewsArticleGallery/NewsArticleGallery";
import '../App.scss';

const Homepage = () => {

  const [click, setClick] = useState(false)

  function handleClick() {
    setClick(!click)
  }

  console.log(click)

  return (
    <>
      <NewsArticleGallery />
      {/* // Template List View  */}
      {/* <h1 className='page-header'>List View</h1>
      <div>
        <div className="listView bg-cover bg-center rounded-xl bg-red-500">
          <input type="checkbox" id="cell" className="cell"></input>
          <label htmlFor="cell" className="listView__cell">
            <div className="listView__face">IGN</div>
            <div className="listView__cellContent">HELLO</div>
          </label>
        </div>
      </div> */}

      {/* <ul className="listView">
        <li className="listView__background bg-red-500">
          <div className="listView__cell" onClick={handleClick}>
            <div className="listView__face">IGN</div>
            <div className={`listView__cellContent ${click ? "listView__cellContent--clicked" : ""}`}>HELLO</div>
          </div>
        </li>
      </ul> */}

      {/* // Template List View  */}
      {/* <h1 className='page-header'>Grid View</h1>
      <div className="gridView mt-2">
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

      {/* <div className="headlineView mt-4">
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
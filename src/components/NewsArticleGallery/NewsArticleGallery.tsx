import { useState } from 'react';

import NewsArticleList from "../NewsArticleList/NewsArticleList";

const NewsArticleGallery = () => {

  // const [filters, setFilters] = useState<any[]>(sessionStorage.filters || [])
  const [viewMode, setViewMode] = useState(sessionStorage.viewMode || "headline")

  function handleViewChange(mode: string) {
    sessionStorage.viewMode = mode;
    setViewMode(mode);
  }

  return (
    <div className="bg-slate-600">
      {/* Move FitlerNav up a level */}
      <NewsArticleList viewMode={viewMode} handleViewChange={handleViewChange} />
    </div>
  );
};

export default NewsArticleGallery;
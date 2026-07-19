import React from 'react';

/* Shared atmosphere for long-form pages (blog posts, imprint). Reuses the
   home sections' cartographic texture and ambient color bands so the article
   glass has a backdrop to refract instead of floating in a blank void. */
const ArticleBackdrop: React.FC = () => (
  <div className="section-geometry geometry-blog" aria-hidden="true">
    <div className="ambient-band-copper absolute -top-24 right-[6%] w-[28rem] h-[28rem] rounded-full" />
    <div className="ambient-band-teal absolute top-[38%] -left-32 w-96 h-96 rounded-full" />
    <div className="floating-shape-strong absolute bottom-[8%] right-[10%] w-80 h-80 rounded-full" />
  </div>
);

export default ArticleBackdrop;

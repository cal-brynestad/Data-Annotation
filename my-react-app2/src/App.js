import React from 'react';

function MyComponent() {
  const shouldShowCover = true; // Replace with your actual condition

  let coverElement;
  if (shouldShowCover) {
      coverElement = <div className="overlay">Content is covered</div>;
  } else {
      coverElement = null;
  }

  return (
      <div>
          {coverElement}
          {<div className="overlay">Content is not covered</div>}
      </div>
  );
}

export default MyComponent;

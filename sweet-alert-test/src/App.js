import React from 'react';
import useCustomAlert from './useCustomAlert'; 

function MyComponent() {
  const { showSuccessAlert } = useCustomAlert();

  return (
    <button onClick={showSuccessAlert}>Show Alert</button>
  );
}

export default MyComponent; 
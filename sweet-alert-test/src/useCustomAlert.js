import { useState } from 'react';
import Swal from 'sweetalert2';

function useCustomAlert() {
  const [showAlert, setShowAlert] = useState(false);

  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Your action was completed.',
      icon: 'success'
    });
  };

  // Add more alert variations if needed

  return { showAlert, setShowAlert, showSuccessAlert }; 
}

export default useCustomAlert;
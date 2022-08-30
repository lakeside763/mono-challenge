import React from 'react'

const useModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor: '#fff',
      border: 'none',
      transform: 'translate(-50%, -50%)',
    },
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
    customStyles
  }
}

export default useModal;
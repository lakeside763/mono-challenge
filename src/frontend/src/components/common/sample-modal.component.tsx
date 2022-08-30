import React, { Fragment } from 'react'
import useModal from '../../hooks/use-modal';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';

const SampleModal = () => {
  const { openModal, closeModal, customStyles, modalIsOpen } = useModal();

  return (
    <Fragment>
      <button onClick={openModal}>Link Now</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-large">
          <div className="modal-header">
            <h2>React Modal</h2>
            <FiX onClick={closeModal}/>
          </div>
          <div className="modal-body">
            <h2>Modal body</h2>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default SampleModal
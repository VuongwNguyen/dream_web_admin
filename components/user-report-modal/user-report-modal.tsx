import React, { useState } from 'react';
import Modal from 'react-modal';
import './ModalStyles.css';

// Set the app element to prevent screen readers from getting trapped in the modal.
Modal.setAppElement('#root');

const UserReportModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Report Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Report Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-header">
          <h2>Title of report</h2>
        </div>

        <div className="modal-content">
          <div className="reporter-info">
            <div className="info-item">
              <strong>Reporter</strong> Id: #askdjfhisf9sdf89sf0 Email: example@gmail.com
            </div>
            <div className="info-item">
              <strong>Reported person</strong> Id: #askdjfhisf9sdf89sf0 Email: example@gmail.com
            </div>
          </div>

          <div className="report-body">
            {/* This can be replaced by a textarea or any content */}
            <div className="grey-box"></div>
          </div>

          <div className="modal-footer">
            <button className="warn-button" onClick={() => alert('Warning action triggered')}>Warn</button>
            <button className="confirm-button" onClick={() => alert('Confirm action triggered')}>Confirm</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserReportModal;

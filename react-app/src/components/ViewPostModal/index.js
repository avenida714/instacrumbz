import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SinglePostModal from './SinglePostModal';

function ViewPostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePostModal />
        </Modal>
      )}
    </>
  );
}

export default ViewPostModal;

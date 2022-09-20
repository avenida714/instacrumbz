import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostForm from './CreatePostForm';
import { TbSquarePlus } from "react-icons/tb";

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <TbSquarePlus className="icon" onClick={() => setShowModal(true)} />
        {/* <button onClick={() => setShowModal(true)}></button> */}
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <PostForm />
            </Modal>
        )}
    </>
  );
}

export default CreatePostModal;

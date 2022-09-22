import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { TbSquarePlus } from "react-icons/tb";
import PostForm from "./PostForm";

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);
  const post = {};

  return (
    <>
      <TbSquarePlus className="icon" onClick={() => setShowModal(true)} />
      {/* <button onClick={() => setShowModal(true)}></button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm
            post={post}
            formType="Create Post"
            onClick={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;

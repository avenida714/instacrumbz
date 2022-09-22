import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { TbSquarePlus } from "react-icons/tb";
import EditCommentForm from "./EditCommentForm";

function EditCommentModal({ post, comment1, commentId, type }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      />
      {/* <button onClick={() => setShowModal(true)}></button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm
            post={post}
            comment1={comment1}
            commentId={commentId}
            type={type}
            onHide={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;

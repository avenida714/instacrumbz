import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SinglePost from "./SinglePost";

function SinglePostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      <img
        style={{ width: "300px", height: "300px", cursor: "pointer" }}
        onClick={() => setShowModal(true)}
        src={post?.image_url}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost post={post} />
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;

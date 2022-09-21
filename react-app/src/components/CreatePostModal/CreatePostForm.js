import React, { useState } from 'react';
import PostForm from './PostForm';


const CreatePostForm = () => {
  const [showModal, setShowModal] = useState(false);

    const post = {
    
      };

    return (
      <PostForm post={post} formType="Create Post" />
    );
  }
  
  export default CreatePostForm;
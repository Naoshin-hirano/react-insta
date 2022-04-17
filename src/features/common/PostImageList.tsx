import React from "react";
import styles from "../post/Post.module.css";
import { useHistory } from 'react-router-dom';

import { PROPS_USER_IMAGELIST } from "../types";

const PostImageList: React.FC<PROPS_USER_IMAGELIST> = ({
  title,
  postId,
  imageUrl,
}) => {
  const history = useHistory();
  const toPostDetail = () => {
    history.push("/post/" + postId);
  }

  if (title) {
    return (
      <div className={styles.post} onClick={toPostDetail}>
        <img className={styles.post_image} src={imageUrl} alt="" />
      </div>
    );
  }
  return null;
};

export default PostImageList;
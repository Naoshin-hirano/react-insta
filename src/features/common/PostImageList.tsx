import React from "react";
import styles from "../post/Post.module.css";
import { useHistory } from 'react-router-dom';

import { PROPS_USER_IMAGELIST } from "../types";

/**
 * 投稿一覧情報の画像一覧をリストレンダリング
 * 
 * @param {string} title 投稿のタイトル
 * @param {number} postId 投稿のID
 * @param {string} imageUrl 投稿の画像URL
 * @returns 投稿一覧の画像一覧
 */
export const PostImageList: React.FC<PROPS_USER_IMAGELIST> = ({
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
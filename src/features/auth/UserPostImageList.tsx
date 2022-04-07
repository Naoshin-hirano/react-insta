import React from "react";
import styles from "./Auth.module.css";

import { PROPS_USER_IMAGELIST } from "../types";

const UserPostImageList: React.FC<PROPS_USER_IMAGELIST> = ({
  title,
  imageUrl,
}) => {

  if (title) {
    return (
      <div className={styles.post}>
        <img className={styles.post_image} src={imageUrl} alt="" />
      </div>
    );
  }
  return null;
};

export default UserPostImageList;
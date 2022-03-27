import React, { useState  } from "react";
import styles from "./Post.module.css";

import { Avatar, Checkbox } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

import AvatarGroup from "@material-ui/lab/AvatarGroup";
import CommentModal from "./CommentModal";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { selectProfiles } from "../auth/authSlice";

import {
  selectComments,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncPostComment,
  fetchAsyncPatchLiked,
  setOpenCommentModal,
} from "./postSlice";

import { PROPS_POST } from "../types";

const Post: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  imageUrl,
  liked,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  
  const [text, setText] = useState("");
  //クリックした投稿ID
  const [clickPostId, setClickPostId] = useState(0);

  //投稿のコメント
  const comments = useSelector(selectComments);
  //投稿のuser情報
  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  //その投稿IDのコメントであることを定義
  const commentsOnPost = comments.filter((com) => {
    return com.post === postId;
  });

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, post: postId };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  const handlerLiked = async () => {
    const packet = {
      id: postId,
      title: title,
      current: liked,
      new: loginId,
    };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPatchLiked(packet));
    await dispatch(fetchPostEnd());
  };

  const openCommentsModal = async () => {
    await setClickPostId(0);
    await dispatch(setOpenCommentModal());
    await setClickPostId(postId);
  };

  if (title) {
    return (
      <div className={styles.post}>
        <div className={styles.post_header}>
          <Avatar className={styles.post_avatar} src={prof[0]?.img} />
          <h3>{prof[0]?.nickName}</h3>
        </div>
        <img className={styles.post_image} src={imageUrl} alt="" />

        <h4 className={styles.post_text}>
          <Checkbox
            className={styles.post_checkBox}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={liked.some((like) => like === loginId)}
            onChange={handlerLiked}
          />
          <span data-testid="counter" className={styles.counter_padding}>{liked.length === 0 ? null : liked.length }</span>
          <strong> {prof[0]?.nickName}</strong> {title}
          <AvatarGroup max={7}>
            {liked.map((like) => (
              <Avatar
                className={styles.post_avatarGroup}
                key={like}
                src={profiles.find((prof) => prof.userProfile === like)?.img}
              />
            ))}
          </AvatarGroup>
        </h4>

        { clickPostId >= 1 && <CommentModal
         commentsOnPost={commentsOnPost}
         prof={prof[0]}
        />}
        { commentsOnPost.length >= 1 && <div onClick={openCommentsModal} className={styles.comment_padding}
        >コメント{commentsOnPost.length}件をすべて見る</div>}

        <form className={styles.post_commentBox}>
          <input
            className={styles.post_input}
            type="text"
            placeholder="add a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={!text.length}
            className={styles.post_button}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      </div>
    );
  }
  return null;
};

export default Post;
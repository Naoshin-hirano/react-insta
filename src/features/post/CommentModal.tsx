import React from "react";
import { 
  PROPS_COMMENTS_ON_COMMENT_MODAL, 
  COMMENT_ON_MODAL,
  PROFILE_ON_COMMENT,
 } from "../types";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Post.module.css";

import {
  resetOpenCommentModal,
  selectOpenCommentModal
} from "./postSlice";

import { selectProfiles } from "../auth/authSlice";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 400,
    height: 330,
    padding: "5px",

    transform: "translate(-50%, -50%)",
  },
};

const useStyles = makeStyles((theme) => ({
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      marginRight: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(1),
    }
  }));

/**
 * 1つの投稿に対してのコメント一覧表示モーダル
 * 
 * @param {PROPS_COMMENTS_ON_COMMENT_MODAL} props プロップス
 * @returns コメント一覧表示モーダルコンポーネント
 */
const CommentModal: React.FC<PROPS_COMMENTS_ON_COMMENT_MODAL> = ( props ) => {

  const { commentsOnPost, prof } = props;
  const dispatch: AppDispatch = useDispatch();
  const openCommentModal = useSelector(selectOpenCommentModal);
  const profiles = useSelector(selectProfiles);
  const classes = useStyles();

  return (
    <>
      <Modal
        isOpen={openCommentModal}
        onRequestClose={async () => {
          await dispatch(resetOpenCommentModal());
        }}
        style={customStyles}>
        <div className={styles.comment_user}>
          <Avatar src={prof?.img} className={classes.large} />
          <p>
            <strong>{prof?.nickName}</strong>
          </p>
        </div>
        <Divider />
        <div className={styles.post_comments}>
          {commentsOnPost?.map((comment: COMMENT_ON_MODAL) => (
            <div key={comment.id} className={styles.post_comment}>
              <Avatar
                src={
                  profiles.find(
                    (prof: PROFILE_ON_COMMENT) => prof.userProfile === comment.userComment
                  )?.img
                }
                className={classes.medium}
              />
              <p>
                <strong className={styles.post_strong}>
                  {
                    profiles.find(
                      (prof: PROFILE_ON_COMMENT) => prof.userProfile === comment.userComment
                    )?.nickName
                  }
                </strong>
                <span data-testid="comments">{comment.text}</span>
              </p>
            </div>
          ))}
        </div>
        
      </Modal>
    </>
  );
};

export default CommentModal;
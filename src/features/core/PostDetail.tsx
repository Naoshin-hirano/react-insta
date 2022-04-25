import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Box from '@material-ui/core/Box';
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { 
    Avatar,
    Divider,
    Grid,
    Checkbox
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import styles from "../post/Post.module.css";
import { AppDispatch } from "../../app/store";

import {
    selectProfile,
    selectProfiles, 
} from "../auth/authSlice";

import { 
    selectComments,
    selectPosts,
    fetchPostStart,
    fetchAsyncPostComment,
    fetchPostEnd,
    fetchAsyncPatchLiked,
} from '../post/postSlice';
import { 
    COMMENT_SELECTOR,
    POST_SELECTOR,
    PROFILE_SELECTOR,
    COMMENT_ON_MODAL,
    PROFILE_ON_COMMENT,
} from '../types';
import { pageComments } from '../post/util';
import { useConfirmJwt } from "../../customhooks/useConfirmJwt";

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
 * 投稿詳細画面
 * 
 * @returns 投稿詳細画面のコンポーネント
 */
const PostDetail: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const classes = useStyles();
    const posts: POST_SELECTOR[] = useSelector(selectPosts);
    const profile: PROFILE_SELECTOR = useSelector(selectProfile);
    const profiles: PROFILE_SELECTOR[] = useSelector(selectProfiles);
    const comments: COMMENT_SELECTOR[] = useSelector(selectComments);
  
    // path関連
    const history = useHistory();
    const path = history.location.pathname;
    const postId: string = path.split('/post/')[1]
    const goBack = () => history.goBack();
  
    // 全ての投稿から当画面の投稿を探す
    const pagePost: any = posts.find(post => post.id === Number(postId));

    // 全てのusersから当画面の投稿主userを探す
    const postUser: any = profiles.find(user => user.userProfile === Number(pagePost?.userPost));

    // 全てのコメントから当画面に投稿されているコメントを探す
    // ※リロードした後にpageCommentsの値が空になるので後続issueで要対応.リロードした後の引数(commentsとpostId)は問題なし
    const commentsOnPost = pageComments(comments, Number(postId));

    const [text, setText] = useState("");

    // お気に入り登録の操作
    const handlerLiked = async () => {
        const packet = {
          id: Number(postId),
          title: pagePost.title,
          current: pagePost.liked,
          new: profile.userProfile
        };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncPatchLiked(packet));
        await dispatch(fetchPostEnd());
      };

    // コメント投稿
    const postComment = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const packet = { 
            text: text, 
            userComment: profile.userProfile, 
            post: Number(postId)
        };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncPostComment(packet));
        await dispatch(fetchPostEnd());

        setText("");
      };
  
    // JWTがローカルストレージにあるか否かでログインするかしないかを判断する
    useConfirmJwt();

  return (
      <>
        <Grid container alignItems="center" justifyContent="center">
            <Box display="flex">
                <div>
                    <img className={styles.detail_img} src={pagePost?.img} alt=""/>
                </div>
                <div className={styles.post_comments}>
                    <div className={styles.comment_user}>
                        <Avatar src={postUser?.img} className={classes.large} />
                        <p>
                            <strong>{postUser?.nickName}</strong>
                        </p>
                    </div>
                    <Divider />
                    {commentsOnPost && (
                    <div>
                        {commentsOnPost.map((comment: COMMENT_ON_MODAL) => (
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
                                <span>{comment.text}</span>
                            </p>
                        </div>
                        ))}
                    </div>)}
                    <div>
                        <Divider />
                        {pagePost && (
                            <div>
                                <Checkbox
                                    className={styles.post_checkBox}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    checked={pagePost.liked.some((like:any) => like === profile.userProfile)}
                                    onChange={handlerLiked}
                                />
                                {pagePost.liked.length >= 1 && <h3>いいね！{pagePost.liked.length}件</h3>}
                            </div>
                        )}
                        <form className={styles.post_commentBox}>
                            <input
                            className={styles.post_input}
                            type="text"
                            placeholder="コメントを追加..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            />
                            <button
                            disabled={!text.length}
                            className={styles.post_button}
                            type="submit"
                            onClick={postComment}
                            >
                            投稿する
                            </button>
                        </form>
                    </div>
                </div>
            </Box>
        </Grid>
　　　　　<button onClick={goBack}>戻る</button>
    </>
  );
};
export default withRouter(PostDetail);
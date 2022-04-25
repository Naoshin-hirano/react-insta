import React from "react";

import styles from "./Core.module.css";
import { useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import {
  selectProfile,
} from "../auth/authSlice";

import {
  selectPosts,
} from "../post/postSlice";

import { PostImageList } from "../common/PostImageList";
import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 
import { favFilter } from "./util";
import { useConfirmJwt } from "../../customhooks/useConfirmJwt";


/**
 * お気に入り登録一覧画面
 * 
 * @returns お気に入り登録一覧画像を表示した画面
 */
const Favorite: React.FC = () => {
  const profile: PROFILE_SELECTOR = useSelector(selectProfile);
  const posts: POST_SELECTOR[] = useSelector(selectPosts);

  // お気に入り登録した投稿のみにフィルタリング
  const favPosts = favFilter(posts, profile);

  // JWTがローカルストレージにあるか否かでログインするかしないかを判断する
  useConfirmJwt();

  return (
    <>
      {favPosts && (
        <>
          <div className={styles.core_posts}>
            <Grid container spacing={4}>
              {favPosts
                .map((post, index) => (
                  <Grid key={index} item xs={12} md={4}>
                    {post && (
                      <PostImageList
                      postId={post.id}
                      title={post.title}
                      imageUrl={post.img}
                    />)}
                  </Grid>
                ))}
            </Grid>
          </div>
        </>
      )}
    </>
  );
};
export default Favorite;
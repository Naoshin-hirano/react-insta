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

import Post from "../post/Post";
import { useConfirmJwt } from "../../customhooks/useConfirmJwt";


/**
 * top画面の投稿一覧をリストレンダリング
 * 
 * @returns top画面の投稿一覧をリストレンダリングする画面
 */
const Core: React.FC = () => {
  const profile = useSelector(selectProfile);
  const posts = useSelector(selectPosts);

  // JWTがローカルストレージにあるか否かでログインするかしないかを判断する
  useConfirmJwt();

  return (
    <>
      {profile?.nickName && (
        <>
          <div className={styles.core_posts}>
            <Grid container spacing={4}>
              {posts
                .slice(0)
                .reverse()
                .map((post) => (
                  <Grid key={post.id} item xs={12} md={4}>
                    <Post
                      postId={post.id}
                      title={post.title}
                      loginId={profile.userProfile}
                      userPost={post.userPost}
                      imageUrl={post.img}
                      liked={post.liked}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default Core;
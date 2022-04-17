import React, { useEffect } from "react";

import styles from "./Core.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { Grid } from "@material-ui/core";

import {
  selectProfile,
  setOpenSignIn,
  resetOpenSignIn,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
} from "../auth/authSlice";

import {
  selectPosts,
  fetchAsyncGetPosts,
  fetchAsyncGetComments,
} from "../post/postSlice";

import PostImageList from "../common/PostImageList";
import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 
import { favFilter } from "./util";

const Favorite: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile: PROFILE_SELECTOR = useSelector(selectProfile);
  const posts: POST_SELECTOR[] = useSelector(selectPosts);

  // お気に入り登録した投稿のみにフィルタリング
  const favPosts = favFilter(posts, profile);

  useEffect(() => {

    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(resetOpenSignIn());
        const result = await dispatch(fetchAsyncGetMyProf());
        if (fetchAsyncGetMyProf.rejected.match(result)) {
          //認証失敗した場合
          dispatch(setOpenSignIn());
          return null;
        }
        //認証成功した場合
        await dispatch(fetchAsyncGetPosts());
        await dispatch(fetchAsyncGetProfs());
        await dispatch(fetchAsyncGetComments());

      }
    };
    fetchBootLoader();

  }, [dispatch]);

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
import React, { useEffect, useState } from "react";

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

import Post from "../post/Post";

const Favorite: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const posts = useSelector(selectPosts);
  const [favpost, setFavposts] = useState<Array<any>>([]);

  useEffect(() => {
    
    //アンマウントされたらstate更新しないように制御
    let isMounted = true

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


        //postsをお気に入り登録した投稿のみにフィルタリング
        let copyLists = [...posts]
        const fav = copyLists.map((post) => {
        　　if(post.liked.includes(profile.userProfile)){
            return post
          }
        })
        const array = [];
        for (let f = 0; f < fav.length; f++ ){
          if (fav[f] == undefined) continue;
          array.push(fav[f]);
        }
        if(isMounted){
          setFavposts(array);
        }

      }
    };
    fetchBootLoader();
    return () => { isMounted = false };
  }, [dispatch, favpost]);

  return (
    <>
      {favpost && (
        <>
          <div className={styles.core_posts}>
            <Grid container spacing={4}>
              {favpost
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
export default Favorite;
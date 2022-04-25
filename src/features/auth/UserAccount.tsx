import React from "react";
import { useHistory, withRouter } from 'react-router-dom';

import styles from "./Auth.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { Grid, Avatar } from "@material-ui/core";
import { Spacer } from "../common/Spacer";

import {
  selectProfiles,
  selectProfile,
  setOpenProfile
} from "../auth/authSlice";

import {
  selectPosts,
  resetOpenNewPost
} from "../post/postSlice";

import EditProfile from "./EditProfile";
import { PostImageList } from "../common/PostImageList";
import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 
import { imageListFilter, getUserProfile } from "./util";
import { useConfirmJwt } from "../../customhooks/useConfirmJwt";


/**
 * userアカウントページ
 * 
 * @returns userアカウントページのコンポーネント
 */
const UserAccount: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts: POST_SELECTOR[] = useSelector(selectPosts);
  const profile: PROFILE_SELECTOR = useSelector(selectProfile);
  const profiles: PROFILE_SELECTOR[] = useSelector(selectProfiles);

  // path関連
  const history = useHistory();
  const path = history.location.pathname;
  const uid = path.split('/user/')[1];

  // postsをLoginUserによる投稿一覧へフィルタリング
  const userPosts = imageListFilter(posts, Number(uid));

  // profilesからpathのユーザーIDのユーザーprofileを取得
  const userAccount = getUserProfile(profiles, Number(uid));

  // JWTがローカルストレージにあるか否かでログインするかしないかを判断する
  useConfirmJwt(path);

  return (
    <>
      {userAccount && (
      <>
        <EditProfile
        userAccount={userAccount} />
        <div className={styles.user_allinfo}>
            <Avatar
            　style={{ height: '120px', width: '120px' }}
              alt="who?" 
              src={profile.userProfile === Number(uid) ? profile.img : userAccount.img} />
            <div className={styles.user_info}>
              <h2>{userAccount.nickName}</h2>
              {profile.userProfile === Number(uid) && (
                <>
                  <Spacer size={12}/>
                  <div onClick={() => {
                    dispatch(setOpenProfile());
                    dispatch(resetOpenNewPost());
                  }}
                  className={styles.user_edit}>プロフィールを編集</div>
                </>
              )}
              <Spacer size={12}/>
              <p style={{ fontSize: '20px' }}>投稿{userPosts.length}件</p>
            </div>
        </div>
      </>
      )}
      {userPosts && (
      <div className={styles.user_posts}>
        <Grid container spacing={4}>
          {userPosts
            .map((post:any) => (
              <Grid key={post.id} item xs={12} md={4}>
                <PostImageList
                  postId={post.id}
                  title={post.title}
                  imageUrl={post.img}
                />
              </Grid>
            ))}
        </Grid>
      </div>
      )}
    </>
  );
};
// path変更時に再レンダリングされるように使用
export default withRouter(UserAccount);
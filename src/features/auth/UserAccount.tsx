import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from 'react-router-dom';

import styles from "./Auth.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { Grid, Avatar } from "@material-ui/core";
import { Spacer } from "../common/Spacer";

import {
  setOpenSignIn,
  resetOpenSignIn,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  selectProfiles,
  selectProfile,
  setOpenProfile
} from "../auth/authSlice";

import {
  selectPosts,
  fetchAsyncGetPosts,
  resetOpenNewPost
} from "../post/postSlice";

import EditProfile from "./EditProfile";
import UserPostImageList from "./UserPostImageList";

const UserAccount: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  
  const [userPosts, setUserposts] = useState<Array<any>>([]);
  const [userAccount, setUseraccount] = useState<any>();

  //path関連
  const history = useHistory();
  const path = history.location.pathname;
  const uid = path.split('/user/')[1]

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
      }
    };    

    fetchBootLoader();

    //postsをLoginUserによる投稿一覧へフィルタリング
    const cloneLists = [...posts];
    const UserImageLists = cloneLists.filter(post => post.userPost === Number(uid));
    setUserposts(UserImageLists);

    //profilesからpathのユーザーIDのユーザーprofileを取得
    const cloneProfiles = [...profiles];
    const userProfile = cloneProfiles.find(user => user.userProfile === Number(uid));
    setUseraccount(userProfile);
    
  //path(withRouter): 他ユーザーアカウント画面からloginユーザーアカウント画面へ遷移したときに再レンダリング
  //posts: ユーザーアカウント画面でreloadしたときにuseEffect再実行
  }, [dispatch, path]);

  return (
    <>
      {userAccount && (
      <>
        <EditProfile
        userAccount={userAccount}
        setUseraccount={setUseraccount} />
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
            .map((post) => (
              <Grid key={post.id} item xs={12} md={4}>
                <UserPostImageList
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
//path変更時に再レンダリングされるように使用
export default withRouter(UserAccount);
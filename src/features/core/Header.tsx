import React, { useEffect } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import Auth from "../auth/Auth";

import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { withStyles } from "@material-ui/core/styles";
import { FavoriteBorder } from "@material-ui/icons";
import {
  Button,
  Avatar,
  Badge,
  CircularProgress,
} from "@material-ui/core";

import { MdAddAPhoto } from "react-icons/md";

import {
  editNickname,
  selectProfile,
  selectIsLoadingAuth,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
} from "../auth/authSlice";

import {
  selectIsLoadingPost,
  setOpenNewPost,
  resetOpenNewPost,
  fetchAsyncGetPosts,
  fetchAsyncGetComments,
} from "../post/postSlice";

import EditProfile from "./EditProfile";
import NewPost from "./NewPost";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);

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

  //画面遷移
  const history = useHistory();
  const myFavorite = () => history.push("/Favorite");
  const toHome = () => history.push("/")

  return (
    <>
      <Auth />
      <EditProfile />
      <NewPost />
      <div className={styles.header_header}>
        <h1 onClick={toHome} className={styles.header_title}>SNS</h1>
        {profile?.nickName ? (
          <>
            <button
              className={styles.header_btnModal}
              onClick={() => {
                dispatch(setOpenNewPost());
                dispatch(resetOpenProfile());
              }}
            >
              <MdAddAPhoto />
            </button>
            <button onClick={myFavorite} className={styles.header_favorits}>
              <FavoriteBorder />
            </button>
            <div className={styles.header_logout}>
              {(isLoadingPost || isLoadingAuth) && <CircularProgress />}
              <Button
                onClick={() => {
                  localStorage.removeItem("localJWT");
                  dispatch(editNickname(""));
                  dispatch(resetOpenProfile());
                  dispatch(resetOpenNewPost());
                  dispatch(setOpenSignIn());
                }}
              >
                Logout
              </Button>
              <button
                className={styles.header_btnModal}
                onClick={() => {
                  dispatch(setOpenProfile());
                  dispatch(resetOpenNewPost());
                }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt="who?" src={profile.img} />{" "}
                </StyledBadge>
              </button>
            </div>
          </>
        ) : (
          <div>
            <Button
              onClick={() => {
                dispatch(setOpenSignIn());
                dispatch(resetOpenSignUp());
              }}
            >
              LogIn
            </Button>
            <Button
              onClick={() => {
                dispatch(setOpenSignUp());
                dispatch(resetOpenSignIn());
              }}
            >
              SignUp
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(Header);
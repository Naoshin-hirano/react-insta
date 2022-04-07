import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./Auth.module.css";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { Spacer} from "../common/Spacer";
import { File } from "../types";

import {
  editNickname,
  selectProfile,
  selectOpenProfile,
  resetOpenProfile,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncUpdateProf,
} from "./authSlice";

import { Button, TextField, IconButton, Grid } from "@material-ui/core";
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 330,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

const avatarStyles = {
  width: 100,
  heigth: 300,
};

const EditProfile: React.FC<any> = (props:any) => {
  const dispatch: AppDispatch = useDispatch();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [image, setImage] = useState<File | null>(null);
  const upload_file_url = image ? URL.createObjectURL(image as File) : "";

  const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { id: profile.id, nickName: profile.nickName, img: image };

    await dispatch(fetchCredStart());
    await dispatch(fetchAsyncUpdateProf(packet));
    await dispatch(fetchCredEnd());
    dispatch(resetOpenProfile());
    setImage(null);
    props.setUseraccount(profile);
  };

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput") as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <>
      <Modal
        isOpen={openProfile}
        onRequestClose={async () => {
          dispatch(resetOpenProfile());
          dispatch(editNickname(props.userAccount.nickName));
          setImage(null);
        }}
        style={customStyles}
      >
        <form className={styles.editprofile_signUp}>
          <h1 className={styles.editprofile_title}>Profile</h1>

          <br />
          <TextField
            placeholder="nickname"
            type="text"
            value={profile?.nickName}
            onChange={(e) => dispatch(editNickname(e.target.value))}
          />
          <Spacer size={10}/>
          <Grid container justifyContent="center">
           {image ? <img data-testid="handler" style={avatarStyles} src={upload_file_url}/> : ""}
          </Grid>
          <input
            type="file"
            id="imageInput"
            hidden={true}
            onChange={(e) => setImage(e.target.files![0])}
          />
          <br />
          <IconButton onClick={handlerEditPicture}>
            <MdAddAPhoto />
          </IconButton>
          <br />
          <Button
            disabled={!profile?.nickName}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateProfile}
          >
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
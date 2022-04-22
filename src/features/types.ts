export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }
/*authSlice.ts*/
export interface PROPS_AUTHEN {
email: string;
password: string;
}

export interface PROPS_PROFILE {
id: number;
nickName: string;
img: File | null;
}

export interface PROPS_NICKNAME {
nickName: string;
}

/*postSlice.ts*/
export interface PROPS_NEWPOST {
title: string;
img: File | null;
}
export interface PROPS_LIKED {
id: number;
title: string;
current: number[];
new: number;
}
export interface PROPS_COMMENT {
text: string;
post: number;
}
/*Post.tsx*/
export interface PROPS_POST {
postId: number;
loginId: number;
userPost: number;
title: string;
imageUrl: string;
liked: number[];
}
// UserPostImageList.tsx
export interface PROPS_USER_IMAGELIST {
  title: string;
  postId: number;
  imageUrl: string;
}
//CommentModal.tsx
export interface PROPS_COMMENTS_ON_COMMENT_MODAL {
  //配列[]にしないとmapやfindできないので注意
  commentsOnPost: {
    id: number;
    text: string;
    userComment: number;
    post: number;
  }[],
  prof: {
    id: number;
    nickName: string;
    userProfile: number;
    created_on: string;
    img: string;
  }
}

export interface EDIT_PROFILE {
  userAccount: {
    id: number;
    nickName: string;
    userProfile: number;
    created_on: string;
    img: string;
  }
}

export interface COMMENT_ON_MODAL {
    id: number;
    text: string;
    userComment: number;
    post: number;
}

export interface PROFILE_ON_COMMENT {
    id: number;
    nickName: string;
    userProfile: number;
    created_on: string;
    img: string;
}

// selector
export interface POST_SELECTOR {
    id: number;
    title: string;
    userPost: number;
    created_on: string;
    img: string;
    liked: number[];
}

export interface PROFILE_SELECTOR {
    id: number;
    nickName: string;
    userProfile: number;
    created_on: string;
    img: string;
}

export interface COMMENT_SELECTOR {
    id: number;
    text: string;
    userComment: number;
    post: number;
}
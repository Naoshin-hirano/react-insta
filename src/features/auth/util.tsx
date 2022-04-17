import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 

export const imageListFilter = (posts: POST_SELECTOR[], uid: number) => {
    const UserImageLists = posts.filter((post:POST_SELECTOR) => post.userPost === uid);
    return UserImageLists;
};

export const getUserProfile  = (profiles: PROFILE_SELECTOR[], uid: number) => {
    const cloneProfiles = [...profiles];
    const userProfile = cloneProfiles.find(user => user.userProfile === uid);
    return userProfile;
};
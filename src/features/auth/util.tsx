import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 

/**
 * 投稿一覧のselectorから画面userの投稿の画像一覧に絞る
 * 
 * @param {POST_SELECTOR[]} posts 投稿一覧のselector
 * @param {number} uid 画面userID
 * @returns 画面userIDの画像一覧
 */
export const imageListFilter = (posts: POST_SELECTOR[], uid: number) => {
    const UserImageLists = posts.filter((post:POST_SELECTOR) => post.userPost === uid);
    return UserImageLists;
};

/**
 * userプロフィールselectorから画面userを探す
 * 
 * @param {PROFILE_SELECTOR[]} profiles userプロフィール一覧のselector 
 * @param {number} uid 画面userID
 * @returns 画面userIDのuserプロフィール
 */
export const getUserProfile  = (profiles: PROFILE_SELECTOR[], uid: number) => {
    const cloneProfiles = [...profiles];
    const userProfile = cloneProfiles.find(user => user.userProfile === uid);
    return userProfile;
};
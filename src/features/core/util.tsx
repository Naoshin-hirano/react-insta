import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 

/**
 * 全ての投稿からお気に入り登録した投稿にフィルタリング
 * 
 * @param {POST_SELECTOR[]} posts 投稿一覧のselector
 * @param {PROFILE_SELECTOR} profile userプロフィール一覧のselector
 * @returns お気に入り登録した投稿一覧
 */
export const favFilter = (posts: POST_SELECTOR[], profile: PROFILE_SELECTOR) => {
    let copyLists = [...posts]
        const fav = copyLists.map((post) => {
        　　if(post.liked.includes(profile.userProfile)){
            return post
          }
          return undefined
        });
        const array = [];
        for (let f = 0; f < fav.length; f++ ){
          if (fav[f] === undefined) continue;
          array.push(fav[f]);
        };
    return array;
};
import { POST_SELECTOR, PROFILE_SELECTOR } from "../types"; 

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
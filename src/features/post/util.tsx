import { COMMENT_SELECTOR } from '../types';

export const pageComments = (comments: COMMENT_SELECTOR[], postId:number) => {
    const commentsList = [...comments];
    const postComments = commentsList.filter((comment: COMMENT_SELECTOR) => comment.post === postId);
    return postComments;
};
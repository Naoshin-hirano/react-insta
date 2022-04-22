import { COMMENT_SELECTOR } from '../types';

/**
 * 詳細画面IDに投稿されたコメントにフィルタリング
 * 
 * @param {COMMENT_SELECTOR[]} comments 全てのコメント一覧のselector
 * @param {number} postId 詳細画面の投稿ID
 * @returns 詳細画面の投稿IDに投稿されたコメント一覧
 */
export const pageComments = (comments: COMMENT_SELECTOR[], postId:number) => {
    const commentsList = [...comments];
    const postComments = commentsList.filter((comment: COMMENT_SELECTOR) => comment.post === postId);
    return postComments;
};
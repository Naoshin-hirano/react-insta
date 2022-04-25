import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
    setOpenSignIn,
    resetOpenSignIn,
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
  } from "../features/auth/authSlice";
  
  import {
    fetchAsyncGetPosts,
  } from "../features/post/postSlice";


/**
 * JWTでログイン状況を確認するカスタムフック
 * 
 * @param {string} path 画面遷移してUrlの投稿IDが変更するごとにuseEffect実行でログイン状況を確認する
 * 引数: pathの引数を渡さない場合もあるので、エラー出ないように引数デフォルトを""としている
 */
export const useConfirmJwt = (path: string = "") => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchBootLoader = async () => {
        if (localStorage.localJWT) {
            dispatch(resetOpenSignIn());
            const result = await dispatch(fetchAsyncGetMyProf());
            if (fetchAsyncGetMyProf.rejected.match(result)) {
            // 認証失敗した場合
            dispatch(setOpenSignIn());
            return null;
            }
            // 認証成功した場合
            await dispatch(fetchAsyncGetPosts());
            await dispatch(fetchAsyncGetProfs());
           }
        };    
    
        fetchBootLoader();
    }, [dispatch, path]);
};
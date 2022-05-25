import {
  getPosts,
  getSignIn,
  getSignUp,
  getSearch,
  getSearchKey,
  postPosts,
} from "@/api/api";

//登入
export const apiGetSignIn = getSignIn;
//註冊
export const apiGetSignUp = getSignUp;
// 取得貼文
export const apiGetPosts = getPosts;
// 發文
export const apiPostPosts = postPosts;
// 搜尋
export const apiGetSearch = getSearch;
// 搜尋關鍵字
export const apiGetSearchKey = getSearchKey;

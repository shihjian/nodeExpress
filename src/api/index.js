import {
  postUserInfo,
  getPosts,
  getSignIn,
  getSignUp,
  getSearch,
  getSearchKey,
  postPosts,
  postPhoto,
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
// 修改個人資訊
export const apiPostUserInfo = postUserInfo;
// 上傳圖片
export const apiPostPhoto = postPhoto;

import {
  postUserInfo,
  getPosts,
  getSignIn,
  getSignUp,
  getSearch,
  getSearchKey,
  postPosts,
  postPhoto,
  postMessage,
  updatePassword,
  getSelfPosts,
} from "@/api/api";

// 登入
export const apiGetSignIn = getSignIn;
// 註冊
export const apiGetSignUp = getSignUp;
// 更改密碼
export const apiPostPassword = updatePassword;
// 取得貼文
export const apiGetPosts = getPosts;
// 取得個人貼文
export const apiGetSelfPosts = getSelfPosts;
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
// 貼文
export const apiPostMessage = postMessage;

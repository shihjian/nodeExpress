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
  userInfos,
  userLikePosts,
  like,
  unlike,
  follow,
  unFollow,
  followList,
} from "@/api/api";

// 登入
export const apiGetSignIn = getSignIn;
// 註冊
export const apiGetSignUp = getSignUp;
// 動態取得個人資訊
export const apiGetUserInfos = userInfos;
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
// 點擊喜歡
export const apiGetLike = like;
// 取消喜歡
export const apiGetUnLike = unlike;
// 取得點讚的文章
export const apiGetUserLikePosts = userLikePosts;
// 追蹤
export const apiPostFollow = follow;
// 取消追蹤
export const apiDeleteFollow = unFollow;
// 取得追蹤清單
export const apiGetFollowList = followList;
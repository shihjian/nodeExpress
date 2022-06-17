import axios from "axios";
import store from "@/store";
import { useStore } from "vuex";

const userRequest = axios.create({
  baseURL: "https://secure-temple-98193.herokuapp.com/",
});

// 攔截 API request 的回傳
userRequest.interceptors.request.use(
  (request) => {
    // API送出前可以做最後的處理
    store.commit("setApiStatus", true);
    request.headers["Authorization"] =
      "Bearer" + "\u0020" + localStorage.getItem("token");
    return request;
  },
  (error) => {
    // 如果送出前失敗了，這邊就可以做一些處理
    store.commit("setApiStatus", false);
    return Promise.reject(error);
  }
);

// 攔截 API response 的回傳
userRequest.interceptors.response.use(
  (response) => {
    store.commit("setApiStatus", false);
    return Promise.resolve(response);
  },
  (error) => {
    // 這邊當API發生錯誤的時候就可以處理 Error handling
    store.commit("setApiStatus", false);
    return Promise.reject(error.response.data);
  }
);

// 登入
export const getSignIn = (data) => userRequest.post("/users/sign_in", data);

// 註冊
export const getSignUp = (data) => userRequest.post("/users/sign_up", data);

// 重設密碼
export const updatePassword = (data) =>
  userRequest.post("/users/updatePassword", data);

// 取得貼文
export const getPosts = (data) => userRequest.get("/posts", data);

// 取得個人貼文
export const getSelfPosts = (data) => userRequest.get(`/posts/user/${data}`);

// 取得貼文
export const postPosts = (data) => userRequest.post("/posts", data);

// 搜尋
export const getSearch = (data) =>
  userRequest.get("/posts?sort=" + `${data.sort}`);

// 關鍵字搜尋
export const getSearchKey = (data) =>
  userRequest.get("/posts?q=" + `${data.q}`);

// 修改個人資訊
export const postUserInfo = (data) => userRequest.patch("/users/profile", data);

// 上傳圖片
export const postPhoto = (data) => userRequest.post("/upload", data);

// 留言
export const postMessage = (data) =>
  userRequest.post(`/posts/${data.id}/comment`, { comment: data.comment });

// 點擊喜歡
export const like = (data) => userRequest.post(`/posts/${data}/like`);

// 取消喜歡
export const unlike = (data) => userRequest.delete(`/posts/${data}/like`);
import axios from "axios";
const userRequest = axios.create({
  baseURL: "https://secure-temple-98193.herokuapp.com/",
});

userRequest.interceptors.request.use(
  (request) => {
    // API送出前可以做最後的處理
    request.headers["Authorization"] =
      "Bearer" + "\u0020" + localStorage.getItem("token");
    return request;
  },
  (error) => {
    // 如果送出前失敗了，這邊就可以做一些處理
    return Promise.reject(error);
  }
);

// 登入
export const getSignIn = (data) => userRequest.post("/users/sign_in", data);

// 註冊
export const getSignUp = (data) => userRequest.post("/users/sign_up", data);

// 取得貼文
export const getPosts = (data) => userRequest.get("/posts", data);

// 搜尋
export const getSearch = data => userRequest.get("/posts?sort="+`${data.sort}`);
// 關鍵字搜尋
export const getSearchKey = data => userRequest.get("/posts?q="+`${data.q}`);
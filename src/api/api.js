import axios from "axios";
const userRequest = axios.create({
  baseURL: "https://secure-temple-98193.herokuapp.com/",
});


// 登入
export const getSignIn = data => userRequest.post('/users/sign_in', data)

// 取得貼文
export const getPosts = data => userRequest.post('/posts', data)

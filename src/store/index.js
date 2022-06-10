import { createStore } from "vuex";
export default createStore({
  state: {
    name: null,
    photo: null,
    apiLoading: false,
  },
  getters: {},
  actions: {},
  mutations: {
    setUserInfo(state, data) {
      state.name = data.name;
      state.photo = data.photo;
    },
    setApiStatus(state, data) {
      state.apiLoading = data;
    },
  },
  modules: {},
});

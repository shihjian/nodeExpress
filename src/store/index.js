import { createStore } from "vuex";
export default createStore({
  state: {
    name: null,
    photo: null,
  },
  getters: {},
  actions: {},
  mutations: {
    setUserInfo(state,data){
      state.name = data.name;
      state.photo = data.photo;
    }
  },
  modules: {},
});

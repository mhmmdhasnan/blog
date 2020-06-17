import Vue from "vue";
import Vuex from "vuex";
import router from "../routes";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLoggedin: false,
  },
  getters: {
    loginState: (state) => {
      return state.isLoggedin;
    },
  },
  mutations: {
    login(state) {
      state.isLoggedin = true;
      if (router.currentRoute.name !== "Home") router.push("/");
    },
    logout(state) {
      state.isLoggedin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expires");

      router.push("/signin");
    },
  },
  actions: {
    login({ commit }, expires_in) {
      setTimeout(() => {
        commit("logout");
      }, expires_in);
      commit("login");
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});

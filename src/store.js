import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    base_url: "https://rpi:3000",
    fetchStatus: true,
    playing: {
      status: false,
      what: "",
      link: ""
    },
    path: "",
    playable: ["video/mp4", "video/webm"],
    mainFolders: [],
    files: []
  },
  mutations: {
    PATH(state, path) {
      state.path = path;
    },
    FILES(state, files) {
      state.files = files;
    },
    MAIN_FOLDERS(state, files) {
      state.mainFolders = files;
    },
    ADD_FILES(state, file) {
      state.files.push(file);
    },
    REMOVE_FILES(state, name) {
      state.files = state.files.filter(el => el.name != name);
    },
    STATUS(state, status) {
      state.fetchStatus = status;
    }
  },
  actions: {
    path({ commit }, path) {
      commit("PATH", path);
    },
    updateFiles({ state, commit }, path) {
      if (
        path ||
        !path ||
        !path.includes("../") ||
        !path.includes("/..") ||
        !path.includes("/../")
      ) {
        commit("FILES", []);
        fetch(state.base_url + "/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          mode: "cors",
          body: JSON.stringify({
            key: "abcd1234",
            action: "get",
            path: path
          })
        })
          .then(res => res.json())
          .then(res => {
            commit("FILES", res);
          })
          .catch(e => console.log(e));
      } else router.push({ name: "home" });
    },
    updateMainFolders({ state, commit }) {
      fetch(state.base_url + "/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          key: "abcd1234",
          action: "mainDirectory"
        })
      })
        .then(res => res.json())
        .then(res => {
          commit("MAIN_FOLDERS", res);
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    files: state => state.files,
    path: state => state.path,
    playable: state => state.playable,
    mainFolders: state => state.mainFolders,
    fileByName: state => name =>
      state.files.length > 0 && state.files.find(el => el.name == name),
    base_url: state => state.base_url
  }
});

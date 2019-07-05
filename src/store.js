import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    base_url: "",
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
    },
    FETCH_STATUS(state, status) {
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
        commit("FETCH_STATUS", true);
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
            commit("FETCH_STATUS", false);
            commit("FILES", res);
          })
          .catch(e => console.log(e));
      } else {
        commit("FETCH_STATUS", false);
        router.push({ name: "home" });
      }
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
    getNext: (state, getters) => activeName => {
      let path = activeName.split("/");
      activeName = path.pop();
      let activeIndex = -1;
      getters.files
        .filter(el => el.mime != "directory")
        .filter((el, i) => {
          if (el.name == activeName) activeIndex = i;
          return el.name == activeName;
        });
      if (
        activeIndex > -1 &&
        state.files &&
        state.files.filter(el => el.mime != "directory")[activeIndex + 1] &&
        activeIndex + 1 <=
          state.files.filter(el => el.mime != "directory").length - 1
      ) {
        return {
          name: state.files.filter(el => el.mime != "directory")[
            activeIndex + 1
          ].name,
          link: state.files.filter(el => el.mime != "directory")[
            activeIndex + 1
          ].link
        };
      } else {
        return false;
      }
    },
    getPrev: (state, getters) => activeName => {
      let path = activeName.split("/");
      activeName = path.pop();
      let activeIndex = -1;
      getters.files
        .filter(el => el.mime != "directory")
        .filter((el, i) => {
          if (el.name == activeName) activeIndex = i;
          return el.name == activeName;
        });
      if (
        activeIndex > -1 &&
        state.files &&
        state.files.filter(el => el.mime != "directory")[activeIndex - 1] &&
        activeIndex != 0
      ) {
        return {
          name: state.files.filter(el => el.mime != "directory")[
            activeIndex - 1
          ].name,
          link: state.files.filter(el => el.mime != "directory")[
            activeIndex - 1
          ].link
        };
      } else {
        return false;
      }
    },
    base_url: state => state.base_url,
    fetch_status: state => state.fetch
  }
});

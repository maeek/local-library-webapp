<template>
  <div class="bar">
    <div class="path">
      <div class="splitter">
        <router-link to="/">Home</router-link>
        <span class="split" v-if="pathSplitter.length > 0">/</span>
      </div>
      <div class="splitter" v-for="(p, i) in pathSplitter" :key="p.name + i">
        <router-link
          :to="i < pathSplitter.length - 1 ? '/path/' + p.path + '/' : ''"
          >{{ p.name }}</router-link
        >
        <span class="split" v-if="i != pathSplitter.length - 1">/</span>
      </div>
    </div>
    <div class="bar-button" @click="updateAll">
      <i class="material-icons">refresh</i>
      <span>Refresh list</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "rightPanel",
  props: {
    path: String
  },
  methods: {
    ...mapActions({
      updatePath: "path",
      updateFiles: "updateFiles",
      updateMainFolders: "updateMainFolders"
    }),
    updateAll() {
      this.updateFiles(this.$route.params.path);
      this.updateMainFolders();
    }
  },
  computed: {
    pathSplitter() {
      this.updatePath(this.$route.params.path);
      return this.$route.params.path
        ? this.$route.params.path
            .split("/")
            .filter(el => el != "" && el != "..")
            .map((el, i, ar) => {
              return {
                name: el,
                path: ar
                  .slice()
                  .splice(0, i + 1)
                  .join("/")
              };
            })
        : [];
    }
  }
};
</script>

<style scoped lang="scss">
.bar {
  width: 100%;
  height: 3.5rem;
  flex: 0 0 auto;
  background: #f7f7f7;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 3;
}

.path {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 1rem;
  height: 100%;
  .splitter {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    a {
      color: #9575cd;
      font-weight: 400;
      text-decoration: none;
    }
    &:last-child {
      a {
        font-weight: 100;
        color: #3e3e3e;
        cursor: default;
      }
    }
    .split {
      margin: 0 0.5rem;
      font-size: 1.5rem;
      color: #673ab7;
      user-select: none;
    }
  }
}

.bar-button {
  display: flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  transition: background 0.2s;
  cursor: pointer;
  &:hover {
    background: #d1c4e9;
  }
  i,
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  i {
    margin: 0 1rem 0 0;
  }
}
@media screen and (max-width: 768px) {
  .path {
    width: 70%;
    overflow-x: auto;
    justify-content: flex-start;
    .splitter {
      white-space: nowrap;
      font-size: 0.7rem;
      a {
        font-size: inherit;
        margin: 0 auto;
      }
    }
    .split {
      font-size: 1rem;
    }
  }
  .bar-button {
    padding: 0 0.5rem;
    font-size: 0.6rem;
    i {
      font-size: 1rem;
      margin: 0 0.3rem 0 0;
    }
  }
}
</style>

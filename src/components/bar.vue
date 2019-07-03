<template>
    <div class="bar">
      <div class="path">
        <div class="splitter">
          <router-link to="/">Home</router-link>
          <span class="split" v-if="i != pathSplitter.length - 1">/</span>
        </div>
        <div class="splitter" v-for="(p, i) in pathSplitter" :key="p.name + i">
          <router-link :to="'/path/' + p.path + '/'">{{ p.name }}</router-link>
          <span class="split" v-if="i != pathSplitter.length - 1">/</span>
        </div>
      </div>
      <div class="bar-button" @click="updateFiles(path);">
        <i class="material-icons">refresh</i>
        <span>Refresh list</span>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "rightPanel",
  props: {
    path: String
  },
  methods: {
    ...mapActions({
      updatePath: "path",
      updateFiles: "updateFiles",
    })
  },
  computed: {
    pathSplitter() {
      this.updatePath(this.$route.params.path);
      return this.$route.params.path
        ? this.$route.params.path
            .split("/")
            .filter(el => el != "")
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
  background: #f7f7f7;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
      color: inherit;
      text-decoration: none;
    }
    .split {
      margin: 0 0.5rem;
      font-size: 1.5rem;
      color: #4ac0ff;
    }
  }
}

.bar-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  transition: background 0.2s;
  cursor: pointer;
  &:hover {
    background: #c7e5f5;
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
</style>

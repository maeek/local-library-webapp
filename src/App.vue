<template>
  <div id="view">
    <div id="app">
      <left-panel />
      <right-panel>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.params.path" />
        </transition>
      </right-panel>
    </div>
  </div>
</template>

<script>
import leftPanel from "@/components/left-panel.vue";
import rightPanel from "@/components/right-panel.vue";
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    leftPanel,
    rightPanel
  },
  computed: {
    ...mapGetters(["darkTheme"])
  }
};
</script>

<style lang="scss">
@import "./assets/_main.scss";
body,
html {
  padding: 0;
  margin: 0;
  min-height: 100%;
  background: linear-gradient(0, #b7e6ff34, #0000000d 3rem);
}
* {
  box-sizing: border-box;
}
#app {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
#view {
  font-family: "KoHo", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  #view {
    overflow: hidden;
  }
  #app {
    flex-direction: column;
  }
}
</style>

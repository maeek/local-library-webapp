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
export default {
  name: "app",
  components: {
    leftPanel,
    rightPanel
  }
};
</script>

<style lang="scss">
@import url("./assets/main.scss");
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
  background: linear-gradient(0, #b7e6ff34, #0000 3rem);
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
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}
.fade-enter {
  transform: translateY(10rem);
  opacity: 0.7;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10rem);
  opacity: 0;
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

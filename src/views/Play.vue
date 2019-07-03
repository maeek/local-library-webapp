<template>
  <div id="app" :key="path">
    <left-panel />
    <right-panel>
     <content-wrap>
        <content-cont>
          <video controls>
            <source :src="'/files/'+(path[path.length - 1] == '/' ? path.split('').slice(0, path.length-2).join('') : path )">
          </video>
        </content-cont>
      </content-wrap>
    </right-panel>
  </div>
</template>

<script>
import leftPanel from "@/components/left-panel.vue";
import rightPanel from "@/components/right-panel.vue";
import contentWrap from "@/components/content-wrap.vue";
import contentCont from "@/components/content.vue";
import { mapActions } from "vuex";

export default {
  name: "app",
  components: {
    leftPanel,
    rightPanel,
    contentWrap,
    contentCont
  },
  props: {
    path: String
  },
  methods: mapActions(["updateMainFolders"]),
  mounted() {
    this.updateMainFolders(this.path);
  }
};
</script>

<style scoped lang="scss">
#app {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.panel.panel--right {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 0 auto;
  height: 100vh;
  flex-direction: column;
}

.content-wrap {
  align-items: center;
  justify-content: center !important;
  .content {
    min-width: 90%;
    max-width: 90%;
    min-height: 90%;
  }
}

video {
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  background: #000;
}
.content-wrap {
  height: calc(100vh - 3.5rem);
  width: 100%;
  display: flex;
  overflow: auto;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex-direction: column;
  background: linear-gradient(0, #4ec1ff34, #0000 5%);
  background-attachment: local;
}
</style>

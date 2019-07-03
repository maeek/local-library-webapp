<template>
  <div id="app">
    <left-panel />
    <right-panel :key="path">
      <content-wrap>
        <content-cont>
          <ul>
            <file v-for="file in files" :file="file" :key="file.name" />
          </ul>
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
import file from "@/components/file.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    leftPanel,
    rightPanel,
    contentWrap,
    contentCont,
    file
  },
  props: {
    path: String
  },
  computed: {
    ...mapGetters(["files"])
  },
  methods: mapActions(["updateFiles", "updateMainFolders"]),
  mounted() {
    this.updateFiles(this.path);
    this.updateMainFolders();
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.panel.panel--right{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 0 auto;
  height: 100vh;
  flex-direction: column;
}
</style>

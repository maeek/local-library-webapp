<template>
  <div class="wrapper">
    <content-wrap>
      <content-cont>
        <ul>
          <file v-for="file in files" :file="file" :key="file.name" />
        </ul>
      </content-cont>
    </content-wrap>
  </div>
</template>

<script>
import contentWrap from "@/components/content-wrap.vue";
import contentCont from "@/components/content.vue";
import file from "@/components/file.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20rem;
}
.panel.panel--right {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 0 auto;
  height: 100vh;
  flex-direction: column;
}
.content--wrap {
  width: 100%;
}
.wrapper {
  width: 100%;
  overflow: hidden;
  height: 100%;
}
</style>

<template>
  <div class="wrapper">
    <content-wrap :class="{ loaded: load }">
      <content-cont>
        <video
          ref="vid"
          v-if="mime.includes('video/') || mime.includes('vnd')"
          controls
        >
          <source :src="base_url + '/files/' + path" />
        </video>
        <audio ref="mus" v-else-if="mime.includes('audio/')" controls>
          <source :src="base_url + '/files/' + path" />
        </audio>
        <img
          ref="imgg"
          :src="base_url + '/files/' + path"
          v-else-if="mime.includes('image/')"
        />
      </content-cont>
      <div class="title">{{ path.split("/").pop() }}</div>
      <div class="actions">
        <action-button @click.native="goTo('/files/' + path)">
          Source
        </action-button>
      </div>
    </content-wrap>
  </div>
</template>

<script>
import contentWrap from "@/components/content-wrap.vue";
import contentCont from "@/components/content.vue";
import actionButton from "@/components/action-button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    contentWrap,
    contentCont,
    actionButton
  },
  data() {
    return {
      loaded: false
    };
  },
  props: {
    path: String
  },
  computed: {
    ...mapGetters(["fileByName", "base_url"]),
    load() {
      return this.loaded;
    },
    mime() {
      return (
        this.fileByName(this.$route.params.path.split("/").pop()).mime ||
        "video/mp4"
      );
    }
  },
  methods: {
    ...mapActions(["updateMainFolders", "updateFiles"]),
    goTo(link) {
      location.href = link;
    }
  },
  mounted() {
    const $this = this;
    console.log(this.$route.params.path);
    this.updateFiles(this.$route.params.path);
    this.updateMainFolders();
    this.$refs.vid &&
      this.$refs.vid.addEventListener("loadedmetadata", function() {
        $this.loaded = true;
      });
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.title {
  width: 100%;
  padding: 1rem;
  background: #d6d6d6;
  font-weight: 900;
}

.actions {
  width: 100%;
  padding: 1rem;
}

.content-wrap {
  width: 100%;
  .content {
    width: 100%;
    height: auto;
    background: #171717;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-radius: 0;
  }
}

video,
audio {
  max-width: 100%;
  max-height: 100%;
  background: #000;
}
img {
  max-width: 100%;
}
audio {
  width: 100%;
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

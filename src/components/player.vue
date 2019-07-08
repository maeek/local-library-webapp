<template>
  <content-cont>
    <imageComponent
      ref="imgg"
      :path="path"
      :mime="mime"
      v-if="mime.includes('image/')"
    />
    <videoComponent
      ref="vid"
      :path="path"
      :mime="mime"
      @ended.native="setEnded"
      v-else-if="mime.includes('video/') || mime.includes('vnd')"
    />
    <audioComponent
      :path="path"
      :mime="mime"
      v-else-if="mime.includes('audio/')"
    ></audioComponent>

    <div class="notsupported" v-else-if="mime">NO PREVIEW</div>
    <div class="notsupported" v-else>
      <div class="loading-wrap">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </content-cont>
</template>

<script>
import contentCont from "@/components/content.vue";
import imageComponent from "@/components/img.vue";
import videoComponent from "@/components/video.vue";
import audioComponent from "@/components/audio.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "play",
  components: {
    contentCont,
    imageComponent,
    videoComponent,
    audioComponent
  },
  props: {
    path: String
  },
  computed: {
    ...mapGetters(["fileByName", "base_url", "getNext", "getPrev"]),
    mime() {
      return this.fileByName(this.$route.params.path.split("/").pop())
        ? this.fileByName(this.$route.params.path.split("/").pop()).mime ||
            "text/plain"
        : "text/plain";
    },
    activeRef() {
      return this.$refs.vid || this.$refs.mus || this.$refs.imgg || false;
    }
  },
  methods: {
    ...mapActions(["updateMainFolders", "updateFiles"]),
    goTo(link) {
      location.href = link;
    },
    routeMe(link) {
      if (link) this.$router.push({ path: `/play/${link}` });
    },
    setEnded() {
      this.$emit("gonext", true);
    }
  }
};
</script>

<style scoped lang="scss">
@keyframes wid {
  from {
    width: 0;
  }
  99% {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
  to {
    width: 100%;
    border-top-right-radius: 0;
    border-top-right-radius: 5px;
  }
}

.notsupported,
.audio-wrapper {
  height: 100%;
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: 900;
  color: #ababab;
}
.content {
  width: 100%;
  // background: #171717;
  background: #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  // min-height: auto;
}
</style>

<template>
  <div class="wrapper">
    <content-wrap>
      <player
        ref="player"
        @prog="setProg"
        @gonext="setRedirect"
        :path="path"
      ></player>
      <play-title :path="path"></play-title>
      <transition name="fade">
        <play-next
          :path="path"
          :prog="prog"
          @routenext="routeMe(getNext(path).link)"
          @cancel="cancelRedirect"
          v-if="getNext(path) && vidEnded"
        ></play-next>
      </transition>
    </content-wrap>
  </div>
</template>

<script>
import contentWrap from "@/components/content-wrap.vue";
import player from "@/components/player.vue";
import playNext from "@/components/play-next.vue";
import playTitle from "@/components/play-title.vue";
import { mapActions, mapGetters } from "vuex";
import { setTimeout, clearTimeout } from "timers";

export default {
  name: "play",
  components: {
    contentWrap,
    player,
    playNext,
    playTitle
  },
  props: {
    path: String
  },
  computed: {
    ...mapGetters(["getNext"]),
    activeRef() {
      return this.$refs.vid || this.$refs.mus || this.$refs.imgg || false;
    }
  },
  data() {
    return {
      vidEnded: false,
      vidEndedTim: null,
      prog: false
    };
  },
  methods: {
    ...mapActions(["updateMainFolders", "updateFiles"]),
    routeMe(link) {
      this.vidEnded = false;
      clearTimeout(this.vidEndedTim);
      if (link) this.$router.push({ path: `/play/${link}` });
    },
    setProg(val) {
      this.prog = val;
    },
    setRedirect() {
      const $this = this;
      if ($this.getNext($this.path)) {
        $this.vidEnded = true;
        $this.prog = true;
        $this.vidEndedTim = setTimeout(() => {
          if ($this.getNext($this.path))
            $this.routeMe($this.getNext($this.path).link);
        }, 10000);
      } else {
        clearTimeout($this.vidEndedTim);
      }
    },
    cancelRedirect() {
      this.vidEnded = false;
      clearTimeout(this.vidEndedTim);
    }
  },
  mounted() {
    this.updateFiles(this.$route.params.path);
    this.updateMainFolders();
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}

.content-wrap {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .content {
    min-height: auto;
  }
}
</style>

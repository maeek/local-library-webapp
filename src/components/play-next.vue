<template>
<div class="playNext">
  <div class="progress" :class="{ init: prog }"></div>
  <div class="closeMe" @click="cancelRedirect">
    <span>Dismiss</span><i class="material-icons">close</i>
  </div>
  <div class="wrap">
    <div class="next">Watch next:</div>
    <div class="what">
      {{ getNext(path) ? getNext(path).name : "" }}
    </div>
  </div>
  <action-button
    v-if="getNext(path)"
    :data-link="getNext(path) ? getNext(path).link : ''"
    @click.native="
      (vidEnded = false),
        getNext(path) ? routeMe(getNext(path).link) : ''
    "
  >
    <i class="material-icons">play_circle_filled</i>
  </action-button>
</div>  
</template>

<script>
import actionButton from "@/components/action-button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "play-next",
  components: {
    actionButton
  },
  props: {
    path: String
  },
  data() {
    return {
      prog: false
    }
  },
  computed: {
    ...mapGetters(["getNext", "getPrev"]),

  },
  methods: {
    ...mapActions(["updateMainFolders", "updateFiles"]),
    routeMe(link) {
      if (link) this.$router.push({ path: "/play/" + link });
    },
    cancelRedirect() {
      this.$parent.vidEnded = false;
      clearTimeout(this.$parent.vidEndedTim);
    }
  }
};
</script>

<style scoped lang="scss">
.playNext {
  position: absolute;
  z-index: 999;
  bottom: 2rem;
  right: 1rem;
  padding: 0.5rem;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0081ccf5;
  color: #f7f7f7;
  border-radius: 5px;
  .progress {
    position: absolute;
    cursor: pointer;
    bottom: -0.5rem;
    left: 0;
    height: 1rem;
    font-size: 1rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #28b0ff;
    overflow: hidden;
    &.init {
      animation-name: wid;
      animation-duration: 10s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  }
  .closeMe {
    position: absolute;
    cursor: pointer;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    border-radius: 5px;
    background: #005485;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    i {
      font-size: inherit;
      margin-left: 0.3rem;
    }
  }
  .wrap {
    padding: 0.5rem;
  }
  .next {
    font-size: 1.5rem;
    font-weight: 900;
  }
  .what {
    word-break: break-all;
    color: #d6d6d6;
  }
  button {
    color: #fff;
    border: 1px solid #fff;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    border-radius: 50%;
    font-size: 3rem;
    &:hover {
      background: #fff;
      color: #0081cc;
    }
    i {
      margin: 0;
    }
  }
}

</style>

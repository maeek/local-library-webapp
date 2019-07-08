<template>
  <div class="playNext">
    <div class="progress" :class="{ init: prog }"></div>
    <div class="closeMe" @click="cancelRedirect">
      <span>Dismiss</span>
      <i class="material-icons">close</i>
    </div>
    <div class="wrap">
      <div class="next">Next:</div>
      <div class="what">
        {{ getNext(path) ? getNext(path).name : "" }}
      </div>
    </div>
    <action-button
      v-if="getNext(path)"
      :data-link="getNext(path) ? getNext(path).link : ''"
      @click.native="getNext(path) ? routeMe() : ''"
    >
      <i class="material-icons">skip_next</i>
    </action-button>
  </div>
</template>

<script>
import actionButton from "@/components/action-button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "playNext",
  components: {
    actionButton
  },
  props: {
    path: String,
    prog: Boolean
  },
  computed: {
    ...mapGetters(["getNext", "getPrev"]),
    load() {
      return this.loaded;
    },
    activeRef() {
      return this.$refs.vid || this.$refs.mus || this.$refs.imgg || false;
    }
  },
  methods: {
    ...mapActions(["updateMainFolders", "updateFiles"]),
    cancelRedirect() {
      this.$emit("cancel", true);
    },
    routeMe() {
      this.$emit("routenext", true);
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

.playNext {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.9rem;
  width: 90%;
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
    top: -0.7rem;
    left: 0;
    height: 1rem;
    font-size: 1rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #28b0ff;
    overflow: hidden;
    &.init {
      animation-name: wid;
      animation-duration: 9s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  }
  .closeMe {
    position: absolute;
    cursor: pointer;
    bottom: -1.8rem;
    left: 0;
    width: 100%;
    font-size: 1rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #005485;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    i {
      font-size: 1.3rem;
      margin-left: 0.1rem;
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
    width: 60px;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 50%;
    user-select: none;
    font-size: 3rem;
    padding: 1rem;
    position: relative;
    &:hover {
      background: #fff;
      color: #0081cc;
    }
    &:hover:after {
      content: "";
      position: absolute;
      top: -10px;
      left: -10px;
      width: 75px;
      height: 75px;
      border-radius: 50%;
      border: 2px solid #77cdff;
    }
    i {
      margin: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .playNext {
    top: 25%;
  }
}
</style>

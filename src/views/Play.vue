<template>
  <div class="wrapper">
    <content-wrap :class="{ loaded: load }">
      <content-cont>
        <img
          ref="imgg"
          :src="mime.includes('image/') ? base_url + '/files' + path : ''"
          v-if="mime.includes('image/')"
        />
        <video
          ref="vid"
          v-else-if="
            mime.includes('video/') || (mime.includes('vnd') && supported)
          "
          controls
        >
          <source
            :src="
              mime.includes('video/') || mime.includes('vnd')
                ? base_url + '/files' + path
                : ''
            "
            :type="mime"
          />
        </video>
        <div class="notsupported " v-else-if="mime.includes('audio/')">
          <div class="audio-wrapper">
            <i class="material-icons">music_note</i>
          </div>
          <audio autoplay ref="mus" controls>
            <source
              :src="mime.includes('audio/') ? base_url + '/files' + path : ''"
            />
          </audio>
        </div>

        <div class="notsupported" v-else-if="mime">
          NO PREVIEW
        </div>
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
      <div class="title">
        {{ path.split("/").pop() }}
        <action-button @click.native="goTo(base_url + '/files' + path)">
          Download <i class="material-icons left-margin">save_alt</i>
        </action-button>
      </div>
      <div class="actions">
        <div class="nav">
          <span v-if="!getPrev(path)"></span>
          <action-button
            class="right"
            v-if="getPrev(path)"
            :data-link="getPrev(path) ? getPrev(path).link : ''"
            @click.native="getPrev(path) ? routeMe(getPrev(path).link) : ''"
          >
            <i class="material-icons right-margin">arrow_back</i> Previous
          </action-button>
          <action-button
            v-if="getNext(path)"
            :data-link="getNext(path) ? getNext(path).link : ''"
            @click.native="getNext(path) ? routeMe(getNext(path).link) : ''"
          >
            Next <i class="material-icons left-margin">arrow_forward</i>
          </action-button>
        </div>
      </div>
      <transition name="fade">
        <div class="playNext" v-if="getNext(path) && isVidEnded">
          <div class="progress" :class="{ init: prog }"></div>
          <div class="closeMe" @click="cancelRedirect">
            <span>Dismiss</span><i class="material-icons">close</i>
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
            @click.native="
              (vidEnded = false),
                getNext(path) ? routeMe(getNext(path).link) : ''
            "
          >
            <i class="material-icons">skip_next</i>
          </action-button>
        </div>
      </transition>
    </content-wrap>
  </div>
</template>

<script>
import contentWrap from "@/components/content-wrap.vue";
import contentCont from "@/components/content.vue";
import actionButton from "@/components/action-button.vue";
import { mapActions, mapGetters } from "vuex";
import { setTimeout, clearTimeout } from "timers";

export default {
  name: "app",
  components: {
    contentWrap,
    contentCont,
    actionButton
  },
  data() {
    return {
      vidEnded: false,
      vidEndedTim: null,
      prog: false,
      supported: false
    };
  },
  props: {
    path: String
  },
  computed: {
    ...mapGetters(["fileByName", "base_url", "getNext", "getPrev"]),
    load() {
      return this.loaded;
    },
    mime() {
      return this.fileByName(this.$route.params.path.split("/").pop())
        ? this.fileByName(this.$route.params.path.split("/").pop()).mime ||
            "text/plain"
        : "text/plain";
    },
    isVidEnded() {
      return this.vidEnded;
    },
    activeRef() {
      return this.$refs.vid || this.$refs.mus || this.$refs.img || false;
    }
  },
  watch: {
    vidEnded: function() {
      const $this = this;
      if (this.vidEnded && $this.getNext($this.path)) {
        $this.prog = true;
        $this.vidEndedTim = setTimeout(() => {
          if ($this.getNext($this.path))
            $this.routeMe($this.getNext($this.path).link);
        }, 10000);
      } else {
        clearTimeout($this.vidEndedTim);
      }
    }
  },
  methods: {
    ...mapActions(["updateMainFolders", "updateFiles"]),
    goTo(link) {
      location.href = link;
    },
    routeMe(link) {
      if (link) this.$router.push({ path: `/play${link}` });
    },
    endedEvent() {
      this.vidEnded = true;
    },
    cancelRedirect() {
      this.vidEnded = false;
      clearTimeout(this.vidEndedTim);
    },
    vidLoaded() {
      this.$refs.vid.style.opacity = 1;
      this.$refs.vid.style.transform = "none";
    },
    canplay() {
      this.supported = true;
    }
  },
  mounted() {
    this.updateFiles(this.$route.params.path);
    this.updateMainFolders();
  },
  updated() {
    if (this.$refs.vid) {
      this.$refs.vid.addEventListener("ended", this.endedEvent);
      this.$refs.vid.addEventListener("loadedmetadata", this.vidLoaded);
      this.$refs.vid.addEventListener("canplaythrough", this.canplay);
    }
    if (this.$refs.mus) {
      this.$refs.mus.addEventListener("ended", this.endedEvent);
      this.$refs.mus.addEventListener("canplaythrough", this.canplay);
    }
  },
  beforeUpdate() {
    if (this.$refs.vid) {
      this.$refs.vid.removeEventListener("ended", this.endedEvent);
      this.$refs.vid.removeEventListener("loadedmetadata", this.vidLoaded);
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
.audio-wrapper {
  justify-content: center;
  user-select: none;
  i {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 5rem;
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
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}

.title {
  width: 100%;
  padding: 1rem;
  background: #f1f1f1;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 0 5px #c3c3c3;
  button {
    background: #0af;
    color: #f0f0f0;
    font-weight: 900;
    margin: 0.3rem 0.3rem;
    &:hover {
      background: #0000;
      color: #0081c1;
    }
  }
}

.actions {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  .nav {
    width: 100%;
    padding: 0.1rem 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
}

.content-wrap {
  width: 100%;
  .content {
    width: 100%;
    // background: #171717;
    background: #dcdcdc;
    display: flex;
    justify-content: center;
    align-items: center;
    // min-height: auto;
  }
}

video,
img {
  width: 100%;
  height: 100%;
  background: #000;
  outline: none;
  transition: opacity 0.3s, transform 0.3s;
  object-fit: contain;
}
img {
  max-width: 100%;
}
audio {
  outline: none;
  width: 100%;
}
video {
  transform: translateY(-5rem);
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .title {
    max-width: 100%;
    word-break: break-all;
  }
  .playNext {
    top: 25%;
  }
  .content {
    min-height: auto;
  }
}
</style>

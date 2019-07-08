<template>
  <div class="notsupported">
    <div class="audio-wrapper">
      <i class="material-icons">music_note</i>
    </div>
    <audio autoplay ref="mus" controls>
      <source
        :src="mime.includes('audio/') ? base_url + '/files' + path : ''"
      />
    </audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "audioComponent",
  props: {
    path: String,
    mime: String
  },
  computed: mapGetters(["base_url"]),
  methods: {
    musLoaded() {
      this.$refs.mus.style.opacity = 1;
      this.$refs.mus.style.transform = "none";
    }
  },
  mounted() {
    const $this = this;
    $this.$refs.mus.addEventListener("loadedmetadata", $this.musLoaded);
  },
  beforeDestroy() {
    const $this = this;
    $this.$refs.mus.removeEventListener("loadedmetadata", $this.musLoaded);
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
audio {
  width: 100%;
  outline: none;
  transition: opacity 0.3s, transform 0.3s;
  object-fit: contain;
  opacity: 0;
  transform: translateY(-5rem);
}
</style>

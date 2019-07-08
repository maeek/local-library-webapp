<template>
  <video ref="vidd" controls>
    <source
      :src="
        mime.includes('video/') || mime.includes('vnd')
          ? base_url + '/files' + path
          : ''
      "
      :type="mime"
    />
  </video>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "player",
  props: {
    path: String,
    mime: String
  },
  computed: mapGetters(["base_url"]),
  methods: {
    vidLoaded() {
      this.$refs.vidd.style.opacity = 1;
      this.$refs.vidd.style.transform = "none";
    }
  },
  mounted() {
    const $this = this;
    $this.$refs.vidd.addEventListener("loadedmetadata", $this.vidLoaded);
  },
  beforeDestroy() {
    const $this = this;
    $this.$refs.vidd.removeEventListener("loadedmetadata", $this.vidLoaded);
  }
};
</script>

<style scoped lang="scss">
video {
  width: 100%;
  height: 100%;
  background: #000;
  outline: none;
  transition: opacity 0.3s, transform 0.3s;
  object-fit: contain;
  opacity: 0;
  transform: translateY(-5rem);
}
</style>

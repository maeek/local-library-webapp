<template>
  <img :src="mime.includes('image/') ? base_url + '/files' + path : ''" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "imageComponent",
  props: {
    mime: String,
    path: String
  },
  computed: {
    ...mapGetters(["base_url"]),
    activeRef() {
      return this.$refs.imgg;
    }
  }
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  background: #000;
  outline: none;
  transition: opacity 0.3s, transform 0.3s;
  object-fit: contain;
  max-width: 100%;
}
</style>

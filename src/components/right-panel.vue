<template>
  <div class="panel">
    <bar />
    <slot></slot>
  </div>
</template>

<script>
import bar from "@/components/bar.vue";
export default {
  name: "rightPanel",
  props: {
    path: String
  },
  components: {
    bar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 0 auto;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  max-width: calc(100% - 250px);
}

@media screen and (max-width: 768px) {
  .panel {
    height: auto;
    width: 100%;
    max-width: 100%;
  }
}
</style>

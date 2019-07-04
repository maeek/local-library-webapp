<template>
  <div class="content-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "contentWrap"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-wrap {
  height: calc(100vh - 3.5rem);
  width: 100%;
  display: flex;
  overflow: auto;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
</style>

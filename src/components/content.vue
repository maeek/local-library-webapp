<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "rightPanel",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: auto;
  margin: 0;
  border-radius: 5px;
}
</style>

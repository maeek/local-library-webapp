<template>
  <button :data-path="file"><slot></slot></button>
</template>

<script>
export default {
  name: "actionButton",
  props: {
    file: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  border: 1px solid #0382c1;
  background: transparent;
  outline: none;
  cursor: pointer;
  border-radius: 50px;
  padding: 0.5rem 2rem;
  margin: 0 0.5rem 0 0;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #0382c1;
    color: #fff;
  }
}
</style>

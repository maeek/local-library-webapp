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
  border: 1px solid #0af;
  background: transparent;
  outline: none;
  position: relative;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  margin: 0 0.5rem 0 0;
  transition: background 0.2s, color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  &.right {
    padding: 0.5rem 0.5rem 0.5rem 2rem;
  }
  &:hover {
    background: #0af;
    color: #fff;
  }
  i {
    font-size: inherit;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &.left-margin {
      right: 0.3rem;
    }
    &.right-margin {
      left: 0.3rem;
    }
  }
}
</style>

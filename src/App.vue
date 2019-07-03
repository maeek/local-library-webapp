<template>
  <div id="view">
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
  background: #e4e4e4;
}
* {
  box-sizing: border-box;
}
#view {
  font-family: "KoHo", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>

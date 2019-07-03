<template>
  <div class="panel">
    <h3>LIBRARY</h3>
    <h5>Folders</h5>
    <ul>
      <li>
        <router-link to="/"
          ><i class="material-icons">home</i> Root folder</router-link
        >
      </li>
      <li v-for="folder in mainFolders" :key="folder.path">
        <router-link :to="'/path' + folder.link + '/'">{{
          folder.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "leftPanel",
  props: {
    path: String
  },
  computed: mapGetters(["mainFolders"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
  height: 100vh;
  width: 250px;
  border-right: 1px solid #d8d8d8;
  background: #f0f0f0;
}
h3 {
  margin: 0;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3.5rem;
  font-size: 2rem;
  font-family: inherit;
  color: #0081cc;
  border-bottom: 1px solid #d8d8d8;
  background: #f7f7f7;
  letter-spacing: 0.2rem;
  font-weight: 900;
}
h5 {
  margin: 1rem;
  color: #004b77;
}
ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  background: linear-gradient(90deg, #0000 5%, #0000);
  cursor: pointer;
  i {
    font-size: inherit;
    margin: 0 1rem 0 0;
  }
}
li:hover {
  background: linear-gradient(90deg, #00a4ff5c 5%, #0000);
  a {
    padding: 1rem 0 1rem 3rem;
  }
}
a {
  transition: padding 0.2s, background 0.2s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  color: inherit;
  text-decoration: none;
}
</style>

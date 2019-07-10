<template>
  <div class="title-wrapper">
    <div class="title">
      {{ path.split("/").pop() }}
      <action-button @click.native="goTo(base_url + '/files' + path)">
        Download
        <i class="material-icons left-margin">save_alt</i>
      </action-button>
    </div>
    <div class="actions">
      <div class="nav">
        <span v-if="!getPrev(path)"></span>
        <action-button
          class="right"
          v-if="getPrev(path)"
          :data-link="getPrev(path) ? getPrev(path).link : ''"
          @click.native="getPrev(path) ? routeMe(getPrev(path).link) : ''"
        >
          <i class="material-icons right-margin">arrow_back</i> Previous
        </action-button>
        <action-button
          v-if="getNext(path)"
          :data-link="getNext(path) ? getNext(path).link : ''"
          @click.native="getNext(path) ? routeMe(getNext(path).link) : ''"
        >
          Next
          <i class="material-icons left-margin">arrow_forward</i>
        </action-button>
      </div>
    </div>
  </div>
</template>

<script>
import actionButton from "@/components/action-button.vue";
import { mapGetters } from "vuex";

export default {
  name: "playerTitle",
  components: {
    actionButton
  },
  props: {
    path: String
  },
  computed: {
    ...mapGetters(["getNext", "getPrev"])
  },
  methods: {
    goTo(link) {
      location.href = link;
    },
    routeMe(link) {
      this.vidEnded = false;
      clearTimeout(this.vidEndedTim);
      if (link) this.$router.push({ path: `/play/${link}` });
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrapper {
  flex: 0 0 auto;
  min-width: 100%;
}
.title {
  width: 100%;
  padding: 1rem;
  background: #f1f1f1;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 0 5px #c3c3c3;
  button {
    background: #512da8;
    color: #f0f0f0;
    font-weight: 900;
    margin: 0.3rem 0.3rem;
    &:hover {
      background: #0000;
      color: #512da8;
    }
  }
}

.actions {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  .nav {
    width: 100%;
    padding: 0.1rem 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 768px) {
  .title {
    max-width: 100%;
    word-break: break-all;
  }
}
</style>

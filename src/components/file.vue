<template>
  <li :key="getFile.name">
    <div class="info">
      <i class="material-icons" @click="open(getFile.mime, getFile.link)">{{
        getIcon
      }}</i>
      <span class="name">{{ getFile.name }}</span>
      <span class="mime">{{ getFile.mime }}</span>
    </div>
    <div class="action">
      <action-button
        v-if="getFile.mime != 'directory'"
        @click.native="goTo('/files/' + getFile.link)"
        >Download</action-button
      >
      <action-button
        :data-link="getFile.link"
        @click.native="open(getFile.mime, getFile.link)"
      >
        {{ getFile.mime == "directory" ? "Open" : "Play" }}
      </action-button>
    </div>
  </li>
</template>

<script>
import actionButton from "@/components/action-button.vue";
export default {
  name: "rightPanel",
  props: {
    file: Object
  },
  components: {
    actionButton
  },
  data() {
    return {
      icon: "description"
    };
  },
  methods: {
    open(type, link) {
      link = link && link[0] == "/" ? link.substring(1) : link;
      console.log(link);
      if (type == "directory") {
        this.$router.push({
          path: `/path/${link}/`
        });
      } else {
        this.$router.push({
          path: `/play/${link}`
        });
      }
    },
    setIcon(mime) {
      if (mime.includes("image/")) return "image";
      else if (mime.includes("video/") || mime.includes("vnd")) return "movie";
      else if (mime.includes("audio/")) return "music_note";
      else if (mime.includes("directory")) return "folder";
      else if (mime.includes("text/") || mime.includes("application/x-subrip"))
        return "description";
      else if (mime.includes("application/")) return "build";
    },
    goTo(link) {
      location.href = link;
    }
  },
  computed: {
    getFile() {
      return this.file;
    },
    getIcon() {
      return this.setIcon(this.getFile.mime);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  width: 100%;
  padding: 0;
  background: #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
  &:nth-of-type(even) {
    background: #eee;
    div {
      i {
        background: #e6e6e6;
      }
    }
  }
  &:hover,
  &:focus {
    background: #daf3ff;
    div {
      i {
        background: #c0eaff;
      }
    }
  }
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    i {
      transition: background 0.2s;
      padding: 1rem;
      cursor: pointer;
      background: #dcdcdc;
    }
    span {
      padding: 0 1rem;
    }
    .mime {
      font-size: 0.9rem;
    }
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
  }
}
</style>

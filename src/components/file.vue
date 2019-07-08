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
        >Download
        <i class="material-icons left-margin">save_alt</i></action-button
      >
      <action-button
        :data-link="getFile.link"
        v-if="
          (getFile.mime && getFile.mime.includes('video/')) ||
            (getFile.mime && getFile.mime.includes('vnd')) ||
            (getFile.mime && getFile.mime.includes('directory')) ||
            (getFile.mime && getFile.mime.includes('image/')) ||
            (getFile.mime && getFile.mime.includes('audio/'))
        "
        @click.native="open(getFile.mime, getFile.link)"
      >
        {{ getFile.mime == "directory" ? "Open" : "Play" }}
        <i class="material-icons left-margin">toll</i>
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
      if (!mime) return "build";
      else if (mime.includes("image/")) return "image";
      else if (mime.includes("video/") || mime.includes("vnd")) return "movie";
      else if (mime.includes("audio/")) return "music_note";
      else if (mime.includes("directory")) return "folder";
      else if (mime.includes("text/") || mime.includes("application/x-subrip"))
        return "description";
      else if (mime.includes("application/")) return "build";
      else return "description";
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
  transition: background 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  &:nth-of-type(even) {
    background: #eee;
    &.info {
      i {
        i {
          background: #e6e6e6;
        }
      }
    }
  }
  &:hover,
  &:focus {
    background: #daf3ff;
    div {
      &.info {
        i {
          background: #c0eaff;
        }
      }
    }
  }
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    &.info {
      i {
        position: relative;
        transition: background 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        padding: 1rem;
        min-height: 100%;
        cursor: pointer;
        background: #dcdcdc;
      }
    }

    span {
      padding: 0 1rem;
    }
    .mime {
      font-size: 0.9rem;
    }
  }
}

@media screen and (max-width: 768px) {
  li {
    max-width: 100%;
    div {
      i {
        padding: 0.5rem;
      }
      span {
        font-size: 0.7rem;
        max-width: 50vw;
        word-break: break-all;
        padding: 0.1rem 0.5rem;
      }
      .mime {
        display: none;
        font-size: 0.6rem;
      }
      button {
        font-size: 0.7rem;
      }
    }
  }
}
</style>

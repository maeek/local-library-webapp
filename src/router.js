import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import Play from "@/views/Play.vue";
import Browse from "@/views/Browse.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Browse
    },
    {
      path: "/path/:path(.*)",
      name: "browse",
      props: true,
      component: Browse,
      strict: true
    },
    {
      path: "/play/:path(.*)",
      name: "play",
      props: true,
      component: Play,
      strict: true
    }
  ]
});

router.afterEach(to => {
  if (
    to.name == "browse" &&
    to.params.path &&
    to.params.path.split("").reverse()[0] == "/" &&
    to.name != "play"
  )
    to.params.path = to.params.path.substring(0, to.params.path.length - 1);
  else if (to.name == "play")
    to.params.path =
      to.params.path[0] != "/" ? "/" + to.params.path : to.params.path;
  store.dispatch("updateFiles", to.params.path);
});

export default router;

import Vue from "vue";
import Vuex from "vuex";
import clients from "./store-clients";
import auth from "./store-auth";
import tasks from "./store-tasks";
import clocks from "./store-clockin";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      clients,
      auth,
      tasks,
      clocks,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
  });

  return Store;
}

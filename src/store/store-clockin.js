import Vue from "vue";
import { uid, Notify } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";
import {
  onValue,
  remove,
  update,
  set,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
const state = {
  clocks: {},
  clocksDownloaded: false,
};
const mutations = {
  updateClock(state, payload) {
    Object.assign(state.clocks[payload.id], payload.updates);
  },
  deleteClock(state, id) {
    Vue.delete(state.clocks, id);
  },
  addClock(state, payload) {
    Vue.set(state.clocks, payload.id, payload.clock);
  },
  setClocksDownloaded(state, value) {
    state.clocksDownloaded = value;
  },
  clearClocks(state) {
    state.clocks = {};
  },
};
const actions = {
  updateClock({ dispatch }, payload) {
    dispatch("fbUpdateClock", payload);
  },
  deleteClock({ dispatch }, id) {
    dispatch("fbDeleteClock", id);
  },
  addClock({ dispatch }, clock) {
    let clockId = uid();
    let payload = {
      id: clockId,
      clock: clock,
    };
    dispatch("fbAddData", payload);
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userClocks = ref(firebaseDb, "clocks/");

    //initial check for data
    onValue(
      userClocks,
      (snapshot) => {
        commit("setClocksDownloaded", true);
      },
      (error) => {
        if (error) {
          console.log("error message: ", error.message);
          this.$router.replace("/auth");
        }
      }
    );

    onChildAdded(userClocks, (snapshot) => {
      let clock = snapshot.val();
      let payload = {
        id: snapshot.key,
        clock: clock,
      };
      commit("addClock", payload);
    });

    onChildChanged(userClocks, (snapshot) => {
      let clock = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: clock,
      };
      commit("updateClock", payload);
    });

    onChildRemoved(userClocks, (snapshot) => {
      let clockId = snapshot.key;
      commit("deleteClock", clockId);
    });
  },
  fbAddData({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userClocks = ref(firebaseDb, "clocks/" + "/" + payload.id);
    set(userClocks, payload.clock, (error) => {
      if (error) {
      }
    });
    Notify.create("Timp adăugat!");
  },
  fbUpdateClock({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userClocks = ref(firebaseDb, "clocks/" + "/" + payload.id);
    update(userClocks, payload.updates, (error) => {
      if (error) {
      }
    });
    let keys = Object.keys(payload.updates);
    if (!(keys.includes("completed") && keys.length == 1)) {
      Notify.create("Timp actualizat!");
    }
  },
  fbDeleteClock({}, clockId) {
    let userId = firebaseAuth.currentUser.uid;
    let userClocks = ref(firebaseDb, "clocks/" + "/" + clockId);
    remove(userClocks, (error) => {
      if (error) {
      }
    });
    Notify.create("Timp șters!");
  },
};

const getters = {
  clocks: (state) => {
    return state.clocks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

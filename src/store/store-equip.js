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
  equips: {},
  equipsDownloaded: false,
};
const mutations = {
  updateEquip(state, payload) {
    Object.assign(state.equips[payload.id], payload.updates);
  },
  deleteEquip(state, id) {
    Vue.delete(state.equips, id);
  },
  addEquip(state, payload) {
    Vue.set(state.equips, payload.id, payload.equip);
  },
  setEquipsDownloaded(state, value) {
    state.equipsDownloaded = value;
  },
  clearEquips(state) {
    state.equips = {};
  },
};
const actions = {
  updateEquip({ dispatch }, payload) {
    dispatch("fbUpdateEquip", payload);
  },
  deleteEquip({ dispatch }, id) {
    dispatch("fbDeleteEquip", id);
  },
  addEquip({ dispatch }, equip) {
    let equipId = uid();
    let payload = {
      id: equipId,
      equip: equip,
    };
    dispatch("fbAddData", payload);
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userEquips = ref(firebaseDb, "equips/");

    //initial check for data
    onValue(
      userEquips,
      (snapshot) => {
        commit("setEquipsDownloaded", true);
      },
      (error) => {
        if (error) {
          console.log("error message: ", error.message);
          this.$router.replace("/auth");
        }
      }
    );

    onChildAdded(userEquips, (snapshot) => {
      let equip = snapshot.val();
      let payload = {
        id: snapshot.key,
        equip: equip,
      };
      commit("addEquip", payload);
    });

    onChildChanged(userEquips, (snapshot) => {
      let equip = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: equip,
      };
      commit("updateEquip", payload);
    });

    onChildRemoved(userEquips, (snapshot) => {
      let equipId = snapshot.key;
      commit("deleteEquip", equipId);
    });
  },
  fbAddData({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userEquips = ref(firebaseDb, "equips/" + "/" + payload.id);
    set(userEquips, payload.equip, (error) => {
      if (error) {
      }
    });
    Notify.create("Echipament adăugat!");
  },
  fbUpdateEquip({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userEquips = ref(firebaseDb, "equips/" + "/" + payload.id);
    update(userEquips, payload.updates, (error) => {
      if (error) {
      }
    });
    let keys = Object.keys(payload.updates);
    if (!(keys.includes("completed") && keys.length == 1)) {
      Notify.create("Echipament actualizat!");
    }
  },
  fbDeleteEquip({}, equipId) {
    let userId = firebaseAuth.currentUser.uid;
    let userEquips = ref(firebaseDb, "equips/" + "/" + equipId);
    remove(userEquips, (error) => {
      if (error) {
      }
    });
    Notify.create("Echipament șters!");
  },
};

const getters = {
  equips: (state) => {
    return state.equips;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

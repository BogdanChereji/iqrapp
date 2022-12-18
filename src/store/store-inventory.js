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
  inventorys: {},
  inventorysDownloaded: false,
};
const mutations = {
  updateInventory(state, payload) {
    Object.assign(state.inventorys[payload.id], payload.updates);
  },
  deleteInventory(state, id) {
    Vue.delete(state.inventorys, id);
  },
  addInventory(state, payload) {
    Vue.set(state.inventorys, payload.id, payload.inventory);
  },
  setInventorysDownloaded(state, value) {
    state.inventorysDownloaded = value;
  },
  clearInventorys(state) {
    state.inventorys = {};
  },
};
const actions = {
  updateInventory({ dispatch }, payload) {
    dispatch("fbUpdateInventory", payload);
  },
  deleteInventory({ dispatch }, id) {
    dispatch("fbDeleteInventory", id);
  },
  addInventory({ dispatch }, inventory) {
    let inventoryId = uid();
    let payload = {
      id: inventoryId,
      inventory: inventory,
    };
    dispatch("fbAddData", payload);
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userInventorys = ref(firebaseDb, "inventorys/");

    //initial check for data
    onValue(
      userInventorys,
      (snapshot) => {
        commit("setInventorysDownloaded", true);
      },
      (error) => {
        if (error) {
          console.log("error message: ", error.message);
          this.$router.replace("/auth");
        }
      }
    );

    onChildAdded(userInventorys, (snapshot) => {
      let inventory = snapshot.val();
      let payload = {
        id: snapshot.key,
        inventory: inventory,
      };
      commit("addInventory", payload);
    });

    onChildChanged(userInventorys, (snapshot) => {
      let inventory = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: inventory,
      };
      commit("updateInventory", payload);
    });

    onChildRemoved(userInventorys, (snapshot) => {
      let inventoryId = snapshot.key;
      commit("deleteInventory", inventoryId);
    });
  },
  fbAddData({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userInventorys = ref(firebaseDb, "inventorys/" + "/" + payload.id);
    set(userInventorys, payload.inventory, (error) => {
      if (error) {
      }
    });
    Notify.create("Stoc adăugat!");
  },
  fbUpdateInventory({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userInventorys = ref(firebaseDb, "inventorys/" + "/" + payload.id);
    update(userInventorys, payload.updates, (error) => {
      if (error) {
      }
    });
    let keys = Object.keys(payload.updates);
    if (!(keys.includes("completed") && keys.length == 1)) {
      Notify.create("Stoc actualizat!");
    }
  },
  fbDeleteInventory({}, inventoryId) {
    let userId = firebaseAuth.currentUser.uid;
    let userInventorys = ref(firebaseDb, "inventorys/" + "/" + inventoryId);
    remove(userInventorys, (error) => {
      if (error) {
      }
    });
    Notify.create("Stoc șters!");
  },
};

const getters = {
  inventorys: (state) => {
    return state.inventorys;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

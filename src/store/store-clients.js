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
  clients: {},
  clientsDownloaded: false,
};
const mutations = {
  updateClient(state, payload) {
    Object.assign(state.clients[payload.id], payload.updates);
  },
  deleteClient(state, id) {
    Vue.delete(state.clients, id);
  },
  addClient(state, payload) {
    Vue.set(state.clients, payload.id, payload.client);
  },
  setClientsDownloaded(state, value) {
    state.clientsDownloaded = value;
  },
  clearClients(state) {
    state.clients = {};
  },
};
const actions = {
  updateClient({ dispatch }, payload) {
    dispatch("fbUpdateClient", payload);
  },
  deleteClient({ dispatch }, id) {
    dispatch("fbDeleteClient", id);
  },
  addClient({ dispatch }, client) {
    let clientId = uid();
    let payload = {
      id: clientId,
      client: client,
    };
    dispatch("fbAddData", payload);
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userClients = ref(firebaseDb, "clients/");

    //initial check for data
    onValue(
      userClients,
      (snapshot) => {
        commit("setClientsDownloaded", true);
      },
      (error) => {
        if (error) {
          console.log("error message: ", error.message);
          this.$router.replace("/auth");
        }
      }
    );

    onChildAdded(userClients, (snapshot) => {
      let client = snapshot.val();
      let payload = {
        id: snapshot.key,
        client: client,
      };
      commit("addClient", payload);
    });

    onChildChanged(userClients, (snapshot) => {
      let client = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: client,
      };
      commit("updateClient", payload);
    });

    onChildRemoved(userClients, (snapshot) => {
      let clientId = snapshot.key;
      commit("deleteClient", clientId);
    });
  },
  fbAddData({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userClients = ref(firebaseDb, "clients/" + "/" + payload.id);
    set(userClients, payload.client, (error) => {
      if (error) {
      }
    });
    Notify.create("Client adăugat!");
  },
  fbUpdateClient({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userClients = ref(firebaseDb, "clients/" + "/" + payload.id);
    update(userClients, payload.updates, (error) => {
      if (error) {
      }
    });
    let keys = Object.keys(payload.updates);
    if (!(keys.includes("completed") && keys.length == 1)) {
      Notify.create("Client actualizat!");
    }
  },
  fbDeleteClient({}, clientId) {
    let userId = firebaseAuth.currentUser.uid;
    let userClients = ref(firebaseDb, "clients/" + "/" + clientId);
    remove(userClients, (error) => {
      if (error) {
      }
    });
    Notify.create("Client șters!");
  },
};

const getters = {
  clients: (state) => {
    return state.clients;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

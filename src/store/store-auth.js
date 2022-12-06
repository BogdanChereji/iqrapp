import { firebaseAuth } from "boot/firebase";
import { showErrorMessageLogin } from "src/functions/function-show-error-messages-login";
import { showErrorMessageRegister } from "src/functions/function-show-error-messages-register";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LocalStorage, Loading } from "quasar";
const state = {
  loggedIn: false,
  admin: false,
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setAdmin(state, value) {
    state.admin = value;
  },
};
const actions = {
  registerUser({}, payload) {
    Loading.show();
    createUserWithEmailAndPassword(
      firebaseAuth,
      payload.email,
      payload.password
    )
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error.message: ", error.message);
        showErrorMessageRegister(error.message);
      });
  },
  logInUser({}, payload) {
    Loading.show();
    signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error.message: ", error.message);
        showErrorMessageLogin(error.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },

  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide();

      //Admin Check
      if (user) {
        let userId = firebaseAuth.currentUser.uid;
        let adminId = "6nAocCTTjzMNTDzQvrgXHpQY98a2";
        if (userId == adminId) {
          commit("setAdmin", true);
          LocalStorage.set("admin", true);
        }

        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        this.$router.push("/").catch((err) => {});
        dispatch("clients/fbReadData", null, { root: true });
        dispatch("tasks/fbReadData", null, { root: true });
        dispatch("clocks/fbReadData", null, { root: true });
      } else {
        commit("clocks/clearClocks", null, { root: true });
        commit("clients/clearClients", null, { root: true });
        commit("tasks/clearTasks", null, { root: true });
        commit("setAdmin", false);
        LocalStorage.set("admin", false);
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch((err) => {});
      }
    });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

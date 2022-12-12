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
  employees: {},
  employeesDownloaded: false,
};
const mutations = {
  updateEmployee(state, payload) {
    Object.assign(state.employees[payload.id], payload.updates);
  },
  deleteEmployee(state, id) {
    Vue.delete(state.employees, id);
  },
  addEmployee(state, payload) {
    Vue.set(state.employees, payload.id, payload.employee);
  },
  setEmployeesDownloaded(state, value) {
    state.employeesDownloaded = value;
  },
  clearEmployees(state) {
    state.employees = {};
  },
};
const actions = {
  updateEmployee({ dispatch }, payload) {
    dispatch("fbUpdateEmployee", payload);
  },
  deleteEmployee({ dispatch }, id) {
    dispatch("fbDeleteEmployee", id);
  },
  addEmployee({ dispatch }, employee) {
    let employeeId = uid();
    let payload = {
      id: employeeId,
      employee: employee,
    };
    dispatch("fbAddData", payload);
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userEmployees = ref(firebaseDb, "employees/");

    //initial check for data
    onValue(
      userEmployees,
      (snapshot) => {
        commit("setEmployeesDownloaded", true);
      },
      (error) => {
        if (error) {
          console.log("error message: ", error.message);
          this.$router.replace("/auth");
        }
      }
    );

    onChildAdded(userEmployees, (snapshot) => {
      let employee = snapshot.val();
      let payload = {
        id: snapshot.key,
        employee: employee,
      };
      commit("addEmployee", payload);
    });

    onChildChanged(userEmployees, (snapshot) => {
      let employee = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: employee,
      };
      commit("updateEmployee", payload);
    });

    onChildRemoved(userEmployees, (snapshot) => {
      let employeeId = snapshot.key;
      commit("deleteEmployee", employeeId);
    });
  },
  fbAddData({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userEmployees = ref(firebaseDb, "employees/" + "/" + payload.id);
    set(userEmployees, payload.employee, (error) => {
      if (error) {
      }
    });
    Notify.create("Employee adăugat!");
  },
  fbUpdateEmployee({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userEmployees = ref(firebaseDb, "employees/" + "/" + payload.id);
    update(userEmployees, payload.updates, (error) => {
      if (error) {
      }
    });
    let keys = Object.keys(payload.updates);
    if (!(keys.includes("completed") && keys.length == 1)) {
      Notify.create("Employee actualizat!");
    }
  },
  fbDeleteEmployee({}, employeeId) {
    let userId = firebaseAuth.currentUser.uid;
    let userEmployees = ref(firebaseDb, "employees/" + "/" + employeeId);
    remove(userEmployees, (error) => {
      if (error) {
      }
    });
    Notify.create("Employee șters!");
  },
};

const getters = {
  employees: (state) => {
    return state.employees;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

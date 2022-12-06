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
  tasks: {},
  tasksDownloaded: false,
};
const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  },
  clearTasks(state) {
    state.tasks = {};
  },
};
const actions = {
  updateTask({ dispatch }, payload) {
    dispatch("fbUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fbDeleteTask", id);
  },
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task,
    };
    dispatch("fbAddData", payload);
  },
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userTasks = ref(firebaseDb, "tasks/");

    //initial check for data
    onValue(
      userTasks,
      (snapshot) => {
        commit("setTasksDownloaded", true);
      },
      (error) => {
        if (error) {
          console.log("error message: ", error.message);
          this.$router.replace("/auth");
        }
      }
    );

    onChildAdded(userTasks, (snapshot) => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        task: task,
      };
      commit("addTask", payload);
    });

    onChildChanged(userTasks, (snapshot) => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: task,
      };
      commit("updateTask", payload);
    });

    onChildRemoved(userTasks, (snapshot) => {
      let taskId = snapshot.key;
      commit("deleteTask", taskId);
    });
  },
  fbAddData({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userTasks = ref(firebaseDb, "tasks/" + "/" + payload.id);
    set(userTasks, payload.task, (error) => {
      if (error) {
      }
    });
    Notify.create("Task adăugat!");
  },
  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let userTasks = ref(firebaseDb, "tasks/" + "/" + payload.id);
    update(userTasks, payload.updates, (error) => {
      if (error) {
      }
    });
    let keys = Object.keys(payload.updates);
    if (!(keys.includes("completed") && keys.length == 1)) {
      Notify.create("Task actualizat!");
    }
  },
  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid;
    let userTasks = ref(firebaseDb, "tasks/" + "/" + taskId);
    remove(userTasks, (error) => {
      if (error) {
      }
    });
    Notify.create("Task șters!");
  },
};

const getters = {
  tasks: (state) => {
    return state.tasks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

<template>
  <q-page class="q-pa-md"
    ><template v-if="tasksDownloaded"
      ><div class="text-right q-mb-lg">
        <q-btn
          v-if="admin"
          @click="showAddTasks = true"
          color="primary"
          icon="add"
          class="q-ml-xs"
          label="Adaugă"
        />
      </div>
      <q-list bordered>
        <task-list
          v-for="(task, key) in tasks"
          :key="key"
          :task="task"
          :id="key"
        ></task-list>
      </q-list>
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em"
      /></span>
    </template>
    <q-dialog v-model="showAddTasks">
      <add-task @close="showAddTasks = false" />
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddTasks: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),
    ...mapState("tasks", ["tasksDownloaded"]),
    ...mapState("auth", ["admin"]),
  },
  components: {
    "task-list": require("components/Tasks/Task.vue").default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
  },
};
</script>

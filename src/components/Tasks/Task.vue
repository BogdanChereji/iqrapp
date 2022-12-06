<template>
  <q-item @click="updateTasks({ id: id, updates: {} })" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ task.nume }} </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showTask = true"
          flat
          dense
          color="primary"
          icon="visibility"
        ></q-btn>
        <q-btn
          v-if="admin"
          @click.stop="showEditTask = true"
          flat
          dense
          color="primary"
          icon="edit"
        ></q-btn>

        <q-btn
          v-if="admin"
          @click.stop="promptToDelete(id)"
          flat
          dense
          color="primary"
          icon="delete"
        ></q-btn>
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task
        :task="task"
        :id="id"
        @close="showEditTask = false"
      ></edit-task>
    </q-dialog>
    <q-dialog v-model="showTask">
      <show-task :task="task" :id="id" @close="showTask = false"></show-task
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false,
      showTask: false,
    };
  },
  computed: { ...mapState("auth", ["admin"]) },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirmă",
          message: "Ești sigur că vrei să ștergi?",
          ok: {
            push: true,
          },
          cancel: {
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask.vue").default,
    "show-task": require("components/Tasks/Modals/ShowTask.vue").default,
  },
};
</script>

<style></style>

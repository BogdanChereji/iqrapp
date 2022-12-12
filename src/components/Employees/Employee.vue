<template>
  <q-item @click="updateEmployee({ id: id, updates: {} })" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ employee.nume }} </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEmployee = true"
          flat
          dense
          color="primary"
          icon="visibility"
        ></q-btn>
        <q-btn
          v-if="admin"
          @click.stop="showEditEmployee = true"
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
    <q-dialog v-model="showEditEmployee">
      <edit-employee
        :employee="employee"
        :id="id"
        @close="showEditEmployee = false"
      ></edit-employee>
    </q-dialog>
    <q-dialog v-model="showEmployee">
      <show-employee
        :employee="employee"
        :id="id"
        @close="showEmployee = false"
      ></show-employee
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["employee", "id"],
  data() {
    return {
      showEditEmployee: false,
      showEmployee: false,
    };
  },
  computed: {
    ...mapState("auth", ["admin"]),
  },
  methods: {
    ...mapActions("employees", ["updateEmployee", "deleteEmployee"]),
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
          this.deleteEmployee(id);
        });
    },
  },
  components: {
    "edit-employee": require("components/Employees/Modals/EditEmployee.vue")
      .default,
    "show-employee": require("components/Employees/Modals/ShowEmployee.vue")
      .default,
  },
};
</script>

<style></style>

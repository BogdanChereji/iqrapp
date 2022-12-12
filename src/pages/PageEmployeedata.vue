<template>
  <q-page>
    <div class="q-pa-md">
      <template v-if="employeesDownloaded">
        <div class="text-right q-mb-lg">
          <q-btn
            v-if="admin"
            to="/editangajati"
            color="primary"
            icon="edit"
            label="Editează"
          />

          <q-btn
            v-if="admin"
            @click="showAddEmployees = true"
            color="primary"
            icon="add"
            class="q-ml-xs"
            label="Adaugă"
          />
        </div>
        <tableemployees :employees="arrayEmployees"></tableemployees>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em"
        /></span>
      </template>
    </div>
    <q-dialog v-model="showAddEmployees">
      <add-employee @close="showAddEmployee = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddEmployees: false,
    };
  },
  computed: {
    ...mapGetters("employees", ["employees"]),
    ...mapState("employees", ["employeesDownloaded"]),
    ...mapState("auth", ["admin"]),

    arrayEmployees() {
      return Object.values(this.employees);
    },
  },
  components: {
    tableemployees: require("components/Employees/EmployeeTable.vue").default,
    "add-employee": require("components/Employees/Modals/AddEmployee.vue")
      .default,
  },
};
</script>

<style></style>

<template>
  <q-page class="q-pa-md">
    <div class="text-left q-mb-lg">
      <q-btn to="/angajati" color="primary" icon="arrow_back" label="Înapoi" />
    </div>
    <q-list bordered>
      <employee
        v-for="(employee, key) in employees"
        :key="key"
        :employee="employee"
        :id="key"
      ></employee>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["admin"]),
    ...mapGetters("employees", ["employees"]),
  },
  components: {
    employee: require("components/Employees/Employee.vue").default,
  },
};
</script>

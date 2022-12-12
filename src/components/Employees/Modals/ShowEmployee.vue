<template>
  <q-card>
    <modal-header>Vizualizează angajatul</modal-header>
    <form>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="employeeToSubmit.codangajat"
              label="Cod angajat"
              ref="codclient"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="employeeToSubmit.nume"
              label="Nume angajat"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="employeeToSubmit.prenume"
              label="Prenume angajat"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="employeeToSubmit.telefon"
              label="Numar de telefon"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="employeeToSubmit.email"
              label="Email"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="employeeToSubmit.adresa"
              label="Adresa angajat"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="employeeToSubmit.iban"
              label="Iban angajat"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="employeeToSubmit.banca"
              label="Banca angajat"
            />
          </q-card-section>
        </div>
      </div>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["employee", "id"],
  data() {
    return {
      employeeToSubmit: {},
    };
  },
  methods: {
    ...mapActions("employees", ["updateEmployee"]),
    submitForm() {
      this.$refs.codangajat.validate();

      if (!this.$refs.codangajat.hasError) {
        this.submitEmployee();
      }
    },
    submitEmployee() {
      this.updateEmployee({ id: this.id, updates: this.employeeToSubmit }),
        this.$emit("close");
    },
  },
  components: {
    "modal-header":
      require("components/Employees/Modals/Shared/ModalHeader.vue").default,
  },
  mounted() {
    this.employeeToSubmit = Object.assign({}, this.employee);
  },
};
</script>

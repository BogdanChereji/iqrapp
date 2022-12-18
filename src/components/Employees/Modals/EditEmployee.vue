<template>
  <q-card>
    <modal-header>Editează angajatul existent</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              dense
              v-model="employeeToSubmit.codangajat"
              label="Cod angajat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              ref="codangajat"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.nume"
              label="Nume angajat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.prenume"
              label="Prenume angajat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.telefon"
              label="Telefon"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.email"
              label="Email"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.adresa"
              label="Adresa"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.iban"
              label="iban"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.banca"
              label="Banca"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Actualizeaza angajatul"
          v-close-popup
          type="submit"
          color="primary"
        />
      </q-card-actions>
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

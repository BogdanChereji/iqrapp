<template>
  <q-card>
    <modal-header>Adaugă un angajat nou</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              dense
              v-model="employeeToSubmit.codangajat"
              label="Cod Angajat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              lazy-rules
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
              label="Numar de telefon"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.email"
              label="Email angajat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="employeeToSubmit.adresa"
              label="Adresa angajat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <div class="col">
            <q-card-section class="q-pt-none">
              <q-input
                outlined
                dense
                v-model="employeeToSubmit.iban"
                label="Iban angajat"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              />
            </q-card-section>
            <div class="col">
              <q-card-section class="q-pt-none">
                <q-input
                  outlined
                  dense
                  v-model="employeeToSubmit.banca"
                  label="Banca angajat"
                  :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                />
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Adaugă angajatul"
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
import ModalHeader from "./Shared/ModalHeader.vue";
export default {
  data() {
    return {
      employeeToSubmit: {
        codangajat: "",
        nume: "",
        prenume: "",
        telefon: "",
        email: "",
        adresa: "",
        iban: "",
        banca: "",
      },
    };
  },
  methods: {
    ...mapActions("employees", ["addEmployee"]),
    submitForm() {
      this.$refs.codangajat.validate();

      if (!this.$refs.codangajat.hasError) {
        this.submitEmployee();
      }
    },
    submitEmployee() {
      this.addEmployee(this.employeeToSubmit);
      this.$emit("close");
    },
  },
  components: {
    "modal-header":
      require("components/Employees/Modals/Shared/ModalHeader.vue").default,
  },
};
</script>

<template>
  <q-card>
    <modal-header>Adaugă înregistrare nouă</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-select
              outlined
              v-model="clockToSubmit.nume"
              map-options
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              ref="employee"
              option-value="id"
              option-label="nume"
              label="Alege un angajat"
              :options="employees"
            />
            <q-input
              outlined
              label="Selectează data"
              v-model="clockToSubmit.data"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer"></q-icon>
                <q-popup-proxy>
                  <q-date v-model="clockToSubmit.data"
                /></q-popup-proxy> </template
            ></q-input>
            <q-select
              outlined
              v-model="clockToSubmit.ziua"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              ref="ziua"
              :options="options"
              label="Alege ziua"
            />

            <q-select
              outlined
              v-model="clockToSubmit.client"
              map-options
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              ref="client"
              option-value="id"
              option-label="nume"
              label="Alege un client"
              :options="clients"
            />

            <q-select
              outlined
              v-model="clockToSubmit.task"
              map-options
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              ref="task"
              use-chips
              multiple
              option-value="id"
              option-label="nume"
              label="Alege un serviciu"
              :options="tasks"
            />
            <q-input
              autofocus
              outlined
              dense
              v-model="clockToSubmit.km"
              label="Distanta parcursa"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              lazy-rules
              ref="km"
            />
            <q-input
              autofocus
              outlined
              dense
              v-model="clockToSubmit.timp"
              label="Timp lucrat"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              lazy-rules
              ref="timp"
            />
            <q-input
              autofocus
              outlined
              dense
              v-model="clockToSubmit.cmt"
              label="Comentariu"
              ref="cmt"
            />
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Adaugă timpul"
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
  props: ["clients", "employees", "tasks", "id"],
  data() {
    return {
      clockToSubmit: {
        nume: "",
        data: "",
        ziua: "",
        client: "",
        timp: "",
        km: "",
        cmt: "",
      },
      model: null,
      options: [
        "Luni",
        "Marti",
        "Miercuri",
        "Joi",
        "Vineri",
        "Sâmbătă",
        "Duminică",
      ],
    };
  },
  methods: {
    ...mapActions("clocks", ["addClock"]),
    submitForm() {
      this.$refs.employee.validate();
      if (!this.$refs.employee.hasError) {
        this.submitClock();
      }
    },
    submitClock() {
      this.addClock(this.clockToSubmit);
      this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
};
</script>

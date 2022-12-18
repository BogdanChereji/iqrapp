<template>
  <q-card>
    <modal-header>Adaugă un serviciu nou</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              dense
              v-model="taskToSubmit.nume"
              label="Denumire servicii"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              lazy-rules
              ref="nume"
            />
            <q-input
              v-model="taskToSubmit.text"
              label="Adăugați instrucțiuni"
              filled
              type="textarea"
            />
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Adaugă serviciu"
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
      taskToSubmit: {
        nume: "",
        text: "",
      },
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitForm() {
      this.$refs.nume.validate();

      if (!this.$refs.nume.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
};
</script>

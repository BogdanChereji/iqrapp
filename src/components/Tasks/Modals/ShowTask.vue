<template>
  <q-card>
    <modal-header>Vizualizează sarcina</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              readonly
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
              ref="text"
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
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {},
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.$refs.nume.validate();

      if (!this.$refs.nume.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.updateTask({ id: this.id, updates: this.taskToSubmit }),
        this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  },
};
</script>

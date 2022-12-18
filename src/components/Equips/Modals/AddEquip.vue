<template>
  <q-card>
    <modal-header>Adaugă un echipament nou</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              dense
              v-model="equipToSubmit.nume"
              label="Denumire echipament"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              lazy-rules
              ref="nume"
            />
            <q-input
              v-model="equipToSubmit.text"
              label="Adăugați detalii tehnice"
              filled
              type="textarea"
            />
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Adaugă echipamentul"
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
      equipToSubmit: {
        nume: "",
        text: "",
      },
    };
  },
  methods: {
    ...mapActions("equips", ["addEquip"]),
    submitForm() {
      this.$refs.nume.validate();

      if (!this.$refs.nume.hasError) {
        this.submitEquip();
      }
    },
    submitEquip() {
      this.addEquip(this.equipToSubmit);
      this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
};
</script>

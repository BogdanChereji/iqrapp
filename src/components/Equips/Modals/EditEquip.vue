<template>
  <q-card>
    <modal-header>Editează echipamentul existent</modal-header>
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
              ref="text"
            />
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Actualizeaza echipamentul"
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
  props: ["equip", "id"],
  data() {
    return {
      equipToSubmit: {},
    };
  },
  methods: {
    ...mapActions("equips", ["updateEquip"]),
    submitForm() {
      this.$refs.nume.validate();

      if (!this.$refs.nume.hasError) {
        this.submitEquip();
      }
    },
    submitEquip() {
      this.updateEquip({ id: this.id, updates: this.equipToSubmit }),
        this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
  mounted() {
    this.equipToSubmit = Object.assign({}, this.equip);
  },
};
</script>

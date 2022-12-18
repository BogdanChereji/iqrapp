<template>
  <q-card>
    <modal-header>Adaugă o sarcină nouă</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              dense
              v-model="inventoryToSubmit.locatie"
              label="Nume locatie"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              lazy-rules
              ref="locatie"
            />
            <div class="row">
              <q-input
                autofocus
                outlined
                dense
                v-model="inventoryToSubmit.e1"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e1"
              />
              <q-input
                autofocus
                outlined
                dense
                v-model="inventoryToSubmit.e1n"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e1n"
              />
            </div>
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Editează stocul"
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
  props: ["inventory", "id"],
  data() {
    return {
      inventoryToSubmit: {},
    };
  },
  methods: {
    ...mapActions("inventorys", ["updateInventory"]),
    submitForm() {
      this.$refs.locatie.validate();

      if (!this.$refs.locatie.hasError) {
        this.submitInventory();
      }
    },
    submitInventory() {
      this.updateInventory({ id: this.id, updates: this.inventoryToSubmit }),
        this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
  mounted() {
    this.inventoryToSubmit = Object.assign({}, this.inventory);
  },
};
</script>

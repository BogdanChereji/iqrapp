<template>
  <q-card>
    <modal-header>Adaugă o sarcină nouă</modal-header>
    <form>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              readonly
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
                readonly
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
                readonly
                dense
                v-model="inventoryToSubmit.e1n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e1n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e2"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e2"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e2n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e1n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e3"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e3"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e3n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e3n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e4"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e4"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e4n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e4n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e5"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e5"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e5n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e5n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e6"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e6"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e6n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e6n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e7"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e7"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e7n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e7n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e8"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e8"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e8n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e8n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e9"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e9"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e9n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e9n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e10"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e10"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e10n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e10n"
              />
            </div>
            <div class="row">
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e11"
                label="Numele elementului"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e11"
              />
              <q-input
                autofocus
                outlined
                readonly
                dense
                v-model="inventoryToSubmit.e11n"
                label="Cantitate"
                :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
                lazy-rules
                ref="e11n"
              />
            </div>
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="inchide"
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

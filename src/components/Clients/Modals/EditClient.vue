<template>
  <q-card>
    <modal-header>Editează clientul existent</modal-header>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              outlined
              dense
              v-model="clientToSubmit.codclient"
              label="Cod client"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
              ref="codclient"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.nume"
              label="Denumire client"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.cif"
              label="CIF/ CNP"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.reg"
              label="Reg com"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.tva"
              label="TVA"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.adresa"
              label="Adresa"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.localitate"
              label="Localitate"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.judet"
              label="Judet"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.contact"
              label="Persoană de contact"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.iban"
              label="IBAN"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.banca"
              label="Banca"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.telefon"
              label="Număr de telefon"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="clientToSubmit.email"
              label="Adresă de email"
              :rules="[(val) => !!val || `Câmpul este obligatoriu`]"
            />
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          class="q-mb-lg q-mr-sm"
          label="Actualizeaza clientul"
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
  props: ["client", "id"],
  data() {
    return {
      clientToSubmit: {},
    };
  },
  methods: {
    ...mapActions("clients", ["updateClient"]),
    submitForm() {
      this.$refs.codclient.validate();

      if (!this.$refs.codclient.hasError) {
        this.submitClient();
      }
    },
    submitClient() {
      this.updateClient({ id: this.id, updates: this.clientToSubmit }),
        this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
  mounted() {
    this.clientToSubmit = Object.assign({}, this.client);
  },
};
</script>

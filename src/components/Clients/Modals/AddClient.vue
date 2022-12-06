<template>
  <q-card>
    <modal-header>Adaugă un client nou</modal-header>
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
              lazy-rules
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
          label="Adaugă clientul"
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
      clientToSubmit: {
        codclient: "",
        nume: "",
        telefon: "",
        email: "",
        contact: "",
        cif: "",
        reg: "",
        tva: "",
        adresa: "",
        localitate: "",
        judet: "",
        iban: "",
        banca: "",
      },
    };
  },
  methods: {
    ...mapActions("clients", ["addClient"]),
    submitForm() {
      this.$refs.codclient.validate();

      if (!this.$refs.codclient.hasError) {
        this.submitClient();
      }
    },
    submitClient() {
      this.addClient(this.clientToSubmit);
      this.$emit("close");
    },
  },
  components: {
    "modal-header": require("components/Clients/Modals/Shared/ModalHeader.vue")
      .default,
  },
};
</script>

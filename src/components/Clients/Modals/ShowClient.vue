<template>
  <q-card>
    <modal-header>Vizualizează clientul</modal-header>
    <form>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="clientToSubmit.codclient"
              label="Cod client"
              ref="codclient"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="clientToSubmit.nume"
              label="Denumire client"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="clientToSubmit.cif"
              label="CIF/ CNP"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="clientToSubmit.reg"
              label="Reg com"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.tva"
              label="TVA"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.adresa"
              label="Adresa"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.localitate"
              label="Localitate"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.judet"
              label="Judet"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.contact"
              label="Persoană de contact"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.iban"
              label="IBAN"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.banca"
              label="Banca"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              readonly
              dense
              v-model="clientToSubmit.telefon"
              label="Număr de telefon"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              readonly
              outlined
              dense
              v-model="clientToSubmit.email"
              label="Adresă de email"
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

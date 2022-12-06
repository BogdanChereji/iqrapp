<template>
  <q-page>
    <div class="q-pa-md">
      <template v-if="clientsDownloaded">
        <div class="text-right q-mb-lg">
          <q-btn to="/clients" color="primary" icon="edit" label="Editează" />

          <q-btn
            v-if="admin"
            @click="showAddClients = true"
            color="primary"
            icon="add"
            class="q-ml-xs"
            label="Adaugă"
          />
        </div>
        <tableclients :clients="arrayClients"></tableclients>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em"
        /></span>
      </template>
    </div>
    <q-dialog v-model="showAddClients">
      <add-client @close="showAddClient = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddClients: false,
    };
  },
  computed: {
    ...mapGetters("clients", ["clients"]),
    ...mapState("clients", ["clientsDownloaded"]),
    ...mapState("auth", ["admin"]),

    arrayClients() {
      return Object.values(this.clients);
    },
  },
  components: {
    tableclients: require("components/Clients/ClientTable.vue").default,
    "add-client": require("components/Clients/Modals/AddClient.vue").default,
  },
};
</script>

<style></style>

<template>
  <q-item @click="updateClient({ id: id, updates: {} })" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ client.nume }} </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showClient = true"
          flat
          dense
          color="primary"
          icon="visibility"
        ></q-btn>
        <q-btn
          v-if="admin"
          @click.stop="showEditClient = true"
          flat
          dense
          color="primary"
          icon="edit"
        ></q-btn>

        <q-btn
          v-if="admin"
          @click.stop="promptToDelete(id)"
          flat
          dense
          color="primary"
          icon="delete"
        ></q-btn>
      </div>
    </q-item-section>
    <q-dialog v-model="showEditClient">
      <edit-client
        :client="client"
        :id="id"
        @close="showEditClient = false"
      ></edit-client>
    </q-dialog>
    <q-dialog v-model="showClient">
      <show-client
        :client="client"
        :id="id"
        @close="showClient = false"
      ></show-client
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["client", "id"],
  data() {
    return {
      showEditClient: false,
      showClient: false,
    };
  },
  computed: {
    ...mapState("auth", ["admin"]),
  },
  methods: {
    ...mapActions("clients", ["updateClient", "deleteClient"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirmă",
          message: "Ești sigur că vrei să ștergi?",
          ok: {
            push: true,
          },
          cancel: {
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.deleteClient(id);
        });
    },
  },
  components: {
    "edit-client": require("components/Clients/Modals/EditClient.vue").default,
    "show-client": require("components/Clients/Modals/ShowClient.vue").default,
  },
};
</script>

<style></style>

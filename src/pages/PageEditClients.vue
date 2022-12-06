<template>
  <q-page class="q-pa-md">
    <div class="text-left q-mb-lg">
      <q-btn
        to="/clientstable"
        color="primary"
        icon="arrow_back"
        label="Înapoi"
      />
    </div>
    <q-list bordered>
      <client
        v-for="(client, key) in clients"
        :key="key"
        :client="client"
        :id="key"
      ></client>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["admin"]),
    ...mapGetters("clients", ["clients"]),
  },
  components: {
    client: require("components/Clients/Client.vue").default,
  },
};
</script>

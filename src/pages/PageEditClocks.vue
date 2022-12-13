<template>
  <q-page class="q-pa-md">
    <div class="text-left q-mb-lg">
      <q-btn to="/raportemp" color="primary" icon="arrow_back" label="Înapoi" />
    </div>
    <q-list bordered>
      <clock
        v-for="(clock, key) in clocks"
        :key="key"
        :clock="clock"
        :id="key"
      ></clock>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["admin"]),
    ...mapGetters("clocks", ["clocks"]),
  },
  components: {
    clock: require("components/ClockIn/Clock.vue").default,
  },
};
</script>

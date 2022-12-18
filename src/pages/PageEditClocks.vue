<template>
  <q-page class="q-pa-md">
    <div class="text-right q-mb-lg">
      <q-btn to="/raportemp" color="primary" icon="arrow_back" label="Înapoi" />
      <q-btn
        @click.stop="promptToDeleteAll(id)"
        color="primary"
        icon="delete"
        class="q-ml-xs"
        label="Șterge baza de date"
      />
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
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  props: ["clock", "id"],
  methods: {
    ...mapActions("clocks", ["updateClock", "deleteClock", "deleteAllClock"]),
    promptToDeleteAll(id) {
      this.$q
        .dialog({
          title: "Confirmă",
          message: "Ești sigur că vrei să ștergi toată baza de date?",
          ok: {
            push: true,
          },
          cancel: {
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.deleteAllClock(id);
        });
    },
  },

  computed: {
    ...mapState("auth", ["admin"]),
    ...mapGetters("clocks", ["clocks"]),
  },
  components: {
    clock: require("components/ClockIn/Clock.vue").default,
  },
};
</script>

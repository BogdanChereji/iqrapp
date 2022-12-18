<template>
  <q-page>
    <div class="q-pa-md">
      <template v-if="clocksDownloaded">
        <div class="row q-gutter-md center">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-subtitle2">Astăzi este data de:</div>
              <div class="text-h5">{{ LunaZiCurenta() }}</div>
              <div class="text-subtitle2">{{ ZiOraCurenta() }}</div>
            </q-card-section>
          </q-card>
          <q-card>
            <q-card-section>
              <div class="q-ma-md">
                <div class="q-gutter-md">
                  <q-btn
                    color="primary"
                    @click="showAddClockIn = true"
                    icon="schedule"
                    size="md"
                    label="Pontaj"
                  />
                  <q-btn
                    disable
                    color="primary"
                    icon="weekend"
                    size="md"
                    label="Concediu"
                  />
                  <q-btn
                    disable
                    color="primary"
                    icon="settings"
                    size="md"
                    label="Setări profil"
                  />
                  <q-btn
                    to="/edit-clocks"
                    color="primary"
                    icon="edit"
                    label="Info/ Sterge"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <table-clocks
          :clocks="arrayClocks"
          :clients="arrayClients"
          :employees="arrayEmployees"
          :tasks="arrayTasks"
        />
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em"
        /></span>
      </template>
    </div>

    <q-dialog v-model="showAddClockIn">
      <add-clockin
        :clients="arrayClients"
        :employees="arrayEmployees"
        :tasks="arrayTasks"
        @close="showAddClockIn = false"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import { date } from "quasar";
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      showAddClockIn: false,
      sizes: ["xs", "sm", "md", "lg", "xl"],
    };
  },
  methods: {
    ZiOraCurenta() {
      const timeStamp = Date.now();
      const ZiOraString = date.formatDate(timeStamp, "dddd HH:mm", {
        days: [
          "Duminică",
          "Luni",
          "Marti",
          "Miercuri",
          "Joi",
          "Vineri",
          "Sâmbătă",
        ],
      });

      return ZiOraString;
    },
    LunaZiCurenta() {
      const timeStamp = Date.now();
      const LunaZiString = date.formatDate(timeStamp, "D MMMM", {
        months: [
          "Ianuarie",
          "Februarie",
          "Martie",
          "Aprilie",
          "Mai",
          "Iunie",
          "Iulie",
          "August",
          "Septembrie",
          "Octombrie",
          "Noiembrie",
          "Decembrie",
        ],
      });
      return LunaZiString;
    },
  },
  computed: {
    ...mapGetters("clients", ["clients"]),
    ...mapGetters("tasks", ["tasks"]),
    ...mapGetters("clocks", ["clocks"]),
    ...mapGetters("employees", ["employees"]),
    ...mapState("clocks", ["clocksDownloaded"]),

    arrayClients() {
      return Object.values(this.clients);
    },
    arrayEmployees() {
      return Object.values(this.employees);
    },
    arrayTasks() {
      return Object.values(this.tasks);
    },
    arrayClocks() {
      return Object.values(this.clocks);
    },
  },
  components: {
    "table-clocks": require("components/ClockIn/ClocksTable.vue").default,
    "add-clockin": require("components/ClockIn/Modals/AddClockin.vue").default,
  },
};
</script>
<style>
.center {
  justify-content: center;
}
</style>

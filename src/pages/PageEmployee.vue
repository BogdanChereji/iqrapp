<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-md">
      <template v-if="clocksDownloaded">
        <!-- mobile-view -->
        <div class="mobile q-gutter-xs">
          <q-card class="q-card bg-transparent no-shadow no-border">
            <q-card-section>
              <div class="text-subtitle2">Astăzi este data de:</div>
              <div class="text-h5">{{ LunaZiCurenta() }}</div>
              <div class="text-subtitle2">{{ ZiOraCurenta() }}</div>
            </q-card-section>
          </q-card>
          <q-card class="q-card bg-transparent no-shadow no-border">
            <q-card-section
              class="q-card__section q-card__section--vert q-pa-sm"
            >
              <div class="row q-col q-gutter-xs">
                <q-btn
                  class="col-md-3 col-sm-12 col-xs-12"
                  color="primary"
                  @click="showAddClockIn = true"
                  icon="schedule"
                  size="md"
                  label="Pontaj"
                />
                <q-btn
                  class="col-md-3 col-sm-12 col-xs-12"
                  disable
                  color="primary"
                  icon="weekend"
                  size="md"
                  label="Concediu"
                />
                <q-btn
                  class="col-md-3 col-sm-12 col-xs-12"
                  disable
                  color="primary"
                  icon="settings"
                  size="md"
                  label="Setări profil"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <!-- Desktop-view -->
        <div class="row desktop q-gutter-md center">
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
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
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
          "Marți",
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
    ...mapState("clocks", ["clocksDownloaded"]),

    arrayClients() {
      return Object.values(this.clients);
    },
    arrayTasks() {
      return Object.values(this.tasks);
    },
    arrayClocks() {
      return Object.values(this.clocks);
    },
  },
  components: {
    "add-clockin": require("components/ClockIn/Modals/AddClockin.vue").default,
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 768px) {
  .desktop {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
}

.center {
  justify-content: center;
}
</style>

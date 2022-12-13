<template>
  <q-item @click="updateClock({ id: id, updates: {} })" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ clock.nume.nume }} </q-item-label>
      <q-item-label>{{ clock.nume.prenume }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ clock.data }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ clock.client.nume }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div>
        <q-btn
          @click.stop="showClockIn = true"
          flat
          dense
          color="primary"
          icon="visibility"
        ></q-btn>

        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          dense
          color="primary"
          icon="delete"
        ></q-btn>
      </div>
    </q-item-section>
    <q-dialog v-model="showEditClockin">
      <edit-clock
        :clock="clock"
        :id="id"
        @close="showEditClockin = false"
      ></edit-clock>
    </q-dialog>
    <q-dialog v-model="showClockIn">
      <show-clock
        :clock="clock"
        :id="id"
        @close="showClockIn = false"
      ></show-clock
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["clock", "id"],
  data() {
    return {
      showEditClockin: false,
      showClockIn: false,
    };
  },

  methods: {
    ...mapActions("clocks", ["updateClock", "deleteClock"]),
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
          this.deleteClock(id);
        });
    },
  },
  components: {
    "edit-clock": require("components/ClockIn/Modals/EditClockin.vue").default,
    "show-clock": require("components/ClockIn/Modals/ShowClockin.vue").default,
  },
};
</script>

<style></style>

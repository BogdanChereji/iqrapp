<template>
  <q-item @click="updateEquips({ id: id, updates: {} })" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ equip.nume }} </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEquip = true"
          flat
          dense
          color="primary"
          icon="visibility"
        ></q-btn>
        <q-btn
          v-if="admin"
          @click.stop="showEditEquip = true"
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
    <q-dialog v-model="showEditEquip">
      <edit-equip
        :equip="equip"
        :id="id"
        @close="showEditEquip = false"
      ></edit-equip>
    </q-dialog>
    <q-dialog v-model="showEquip">
      <show-equip
        :equip="equip"
        :id="id"
        @close="showEquip = false"
      ></show-equip
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["equip", "id"],
  data() {
    return {
      showEditEquip: false,
      showEquip: false,
    };
  },
  computed: { ...mapState("auth", ["admin"]) },
  methods: {
    ...mapActions("equips", ["updateEquip", "deleteEquip"]),
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
          this.deleteEquip(id);
        });
    },
  },
  components: {
    "edit-equip": require("components/Equips/Modals/EditEquip.vue").default,
    "show-equip": require("components/Equips/Modals/ShowEquip.vue").default,
  },
};
</script>

<style></style>

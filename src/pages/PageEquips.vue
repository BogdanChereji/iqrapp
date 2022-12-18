<template>
  <q-page class="q-pa-md"
    ><template v-if="equipsDownloaded"
      ><div class="text-right q-mb-lg">
        <q-btn
          v-if="admin"
          @click="showAddEquips = true"
          color="primary"
          icon="add"
          class="q-ml-xs"
          label="Adaugă"
        />
      </div>
      <q-list bordered>
        <equip-list
          v-for="(equip, key) in equips"
          :key="key"
          :equip="equip"
          :id="key"
        ></equip-list>
      </q-list>
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em"
      /></span>
    </template>
    <q-dialog v-model="showAddEquips">
      <add-equip @close="showAddEquips = false" />
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddEquips: false,
    };
  },
  computed: {
    ...mapGetters("equips", ["equips"]),
    ...mapState("equips", ["equipsDownloaded"]),
    ...mapState("auth", ["admin"]),
  },
  components: {
    "equip-list": require("components/Equips/Equip.vue").default,
    "add-equip": require("components/Equips/Modals/AddEquip.vue").default,
  },
};
</script>

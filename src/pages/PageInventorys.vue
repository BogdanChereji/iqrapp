<template>
  <q-page class="q-pa-md"
    ><template v-if="inventorysDownloaded"
      ><div class="text-right q-mb-lg">
        <q-btn
          @click="showAddInventorys = true"
          color="primary"
          icon="add"
          class="q-ml-xs"
          label="Adaugă"
        />
      </div>
      <q-list bordered>
        <inventory-list
          v-for="(inventory, key) in inventorys"
          :key="key"
          :inventory="inventory"
          :id="key"
        ></inventory-list>
      </q-list>
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em"
      /></span>
    </template>
    <q-dialog v-model="showAddInventorys">
      <add-inventory @close="showAddInventorys = false" />
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddInventorys: false,
    };
  },
  computed: {
    ...mapGetters("inventorys", ["inventorys"]),
    ...mapState("inventorys", ["inventorysDownloaded"]),
    ...mapState("auth", ["admin"]),
  },
  components: {
    "inventory-list": require("components/Inventorys/Inventory.vue").default,
    "add-inventory": require("components/Inventorys/Modals/AddInventory.vue")
      .default,
  },
};
</script>

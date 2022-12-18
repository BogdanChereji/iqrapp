<template>
  <q-item @click="updateInventorys({ id: id, updates: {} })" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ inventory.locatie }} </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showInventory = true"
          flat
          dense
          color="primary"
          icon="visibility"
        ></q-btn>
        <q-btn
          v-if="admin"
          @click.stop="showEditInventory = true"
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
    <q-dialog v-model="showEditInventory">
      <edit-inventory
        :inventory="inventory"
        :id="id"
        @close="showEditInventory = false"
      ></edit-inventory>
    </q-dialog>
    <q-dialog v-model="showInventory">
      <show-inventory
        :inventory="inventory"
        :id="id"
        @close="showInventory = false"
      ></show-inventory
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["inventory", "id"],
  data() {
    return {
      showEditInventory: false,
      showInventory: false,
    };
  },
  computed: { ...mapState("auth", ["admin"]) },
  methods: {
    ...mapActions("inventorys", ["updateInventory", "deleteInventory"]),
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
          this.deleteInventory(id);
        });
    },
  },
  components: {
    "edit-inventory": require("components/Inventorys/Modals/EditInventory.vue")
      .default,
    "show-inventory": require("components/Inventorys/Modals/ShowInventory.vue")
      .default,
  },
};
</script>

<style></style>

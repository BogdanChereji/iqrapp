<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> IQR.ro </q-toolbar-title>
        <div class="text absolute-center">
          Aplicație dezvoltată de BMD Media
        </div>
        <q-btn
          v-if="!loggedIn"
          to="/auth"
          color="primary"
          icon-right="account_circle"
          label="Conectează-te!"
        />
        <q-btn-dropdown v-else color="primary" label="Bun venit!">
          <q-list>
            <q-item clickable to="/settings" v-close-popup>
              <q-item-section>
                <q-item-label>Setări</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logoutUser">
              <q-item-section>
                <q-item-label>Deconectare</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- Footer -->
    <q-footer>
      <q-tabs inline-label class="bg-primary text-white shadow-2">
        <q-route-tab to="/" icon="dashboard" label="Dashboard" />
        <q-route-tab
          to="/employee"
          icon="badge"
          label="Interfata angajat"
          v-if="!admin"
        />
        <q-route-tab
          to="/raportemp"
          icon="badge"
          label="Raport angajati"
          v-if="admin"
        />
        <q-route-tab>
          <q-btn-dropdown color="primary" icon="reorder" label="Nomenclatoare">
            <q-list>
              <q-item clickable v-close-popup to="/clientstable">
                <q-item-section>
                  <q-item-label>Clienti</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="/tasks">
                <q-item-section>
                  <q-item-label>Sarcini</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown></q-route-tab
        >
      </q-tabs></q-footer
    >

    <!-- Drawer -->
    <q-drawer
      dense
      :width="250"
      :breakpoint="767"
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-primary"
    >
      <q-list class="text-grey-2">
        <q-item-label class="text-grey-2" header>
          Meniu de navigare
        </q-item-label>
        <q-item to="/" exact clickable>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/employee" exact clickable v-if="!admin">
          <q-item-section avatar>
            <q-icon name="badge" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Interfata angajat</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <!-- Nomenclatoare -->
        <q-expansion-item expand-separator icon="reorder" label="Nomenclatoare">
          <q-card>
            <q-card-section class="bg-primary">
              <q-item to="/angajati" exact clickable>
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Angajati</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/clientstable" exact clickable>
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Clienți</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Tasks" exact clickable>
                <q-item-section avatar>
                  <q-icon name="task" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Sarcini</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <!-- Rapoarte -->
        <q-expansion-item
          expand-separator
          icon="article"
          label="Rapoarte"
          v-if="admin"
        >
          <q-card>
            <q-card-section class="bg-primary">
              <q-item to="/raportemp" exact clickable>
                <q-item-section avatar>
                  <q-icon name="summarize" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Raport angajat</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "MainLayout",

  data() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      navs: [
        {
          label: "Dashboard",
          icon: "dashboard",
          to: "/",
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "admin"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .text {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: #ff7700 !important;
  }
}
</style>

const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageDashboard.vue") },
    ],
  },

  {
    path: "/clients",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageEditClients.vue") },
    ],
  },
  {
    path: "/edit-clocks",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageEditClocks.vue") },
    ],
  },
  {
    path: "/clientstable",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageTableClients.vue") },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/Layout.vue"),
    children: [{ path: "", component: () => import("pages/PageAuth.vue") }],
  },
  {
    path: "/tasks",
    component: () => import("layouts/Layout.vue"),
    children: [{ path: "", component: () => import("pages/PageTasks.vue") }],
  },
  {
    path: "/equips",
    component: () => import("layouts/Layout.vue"),
    children: [{ path: "", component: () => import("pages/PageEquips.vue") }],
  },
  {
    path: "/inventar",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageInventorys.vue") },
    ],
  },
  {
    path: "/employee",
    component: () => import("layouts/Layout.vue"),
    children: [{ path: "", component: () => import("pages/PageEmployee.vue") }],
  },
  {
    path: "/raportemp",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageRaportEmployee.vue") },
    ],
  },
  {
    path: "/angajati",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageEmployeedata.vue") },
    ],
  },
  {
    path: "/editangajati",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageEditEmployees.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;

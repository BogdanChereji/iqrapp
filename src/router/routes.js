const routes = [
  {
    path: "/employee",
    component: () => import("layouts/Layout.vue"),
    children: [{ path: "", component: () => import("pages/PageEmployee.vue") }],
  },

  {
    path: "/clients",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/PageEditClients.vue") },
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;

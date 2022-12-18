<template>
  <div class="q-pa-md">
    <q-table
      table-header-class="bg-primary text-white"
      title="Înregistrări"
      :data="clocks"
      :columns="columns"
      :visible-columns="visibleColumns"
      color="primary"
      row-key="name"
      :filter="filter"
      no-data-label="Nu s-au găsit înregistrări de date"
    >
      <template v-slot:top-right>
        <q-input
          class="q-mr-lg"
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Genereaza raport CSV"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile } from "quasar";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  props: ["clocks", "id"],

  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.clocks.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },

  data() {
    return {
      filter: "",

      visibleColumns: [
        "nume",
        "data",
        "ziua",
        "client",
        "timp",
        "task",
        "distanta",
      ],
      columns: [
        {
          name: "nume",
          label: "Nume Angajat",
          align: "left",
          field: (row) => row.nume.nume,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "data",
          label: "Data",
          align: "left",
          field: (row) => row.data,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ziua",
          label: "Ziua",
          align: "left",
          field: (row) => row.ziua,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "client",
          label: "Client",
          align: "left",
          field: (row) => row.client.nume,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "task",
          label: "Serviciu",
          align: "left",
          field: (row) => row.task.map((v) => v.nume).join(", "),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "timp",
          label: "Timp de lucru",
          align: "left",
          field: (row) => row.timp + " ore",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "distanta",
          label: "Distanta parcursa",
          align: "left",
          field: (row) => row.km + " km",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "cmt",
          label: "Comentariu",
          align: "left",
          field: (row) => row.cmt,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
    };
  },
};
</script>

<style></style>

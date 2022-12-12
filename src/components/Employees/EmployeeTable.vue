<template>
  <div>
    <q-table
      class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow"
      table-header-class="bg-primary text-white"
      title="Angajati"
      :data="employees"
      :columns="columns"
      :visible-columns="visibleColumns"
      color="primary"
      row-key="name"
      :filter="filter"
      @row-click="onRowClick"
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
          v-if="admin"
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
import { mapState } from "vuex";
import { exportFile } from "quasar";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  props: ["employees", "id"],

  methods: {
    onRowClick(evt, row) {
      console.log("clicked on", row.nume);
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.employees.map((row) =>
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

      showEditEmployee: false,
      visibleColumns: ["codangajat", "Nume", "Prenume", "Telefon", "Email"],
      columns: [
        {
          name: "codangajat",
          label: "Cod",
          align: "left",
          field: (row) => row.codangajat,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Nume",
          label: "Nume ",
          align: "left",
          field: (row) => row.nume,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Prenume",
          label: "Prenume",
          align: "left",
          field: (row) => row.prenume,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Telefon",
          label: "Telefon",
          align: "left",
          field: (row) => row.telefon,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Email",
          label: "Email",
          align: "left",
          field: (row) => row.email,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Adresa",
          label: "Adresa",
          align: "left",
          field: (row) => row.adresa,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Iban",
          label: "Iban",
          align: "left",
          field: (row) => row.iban,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Banca",
          label: "Banca",
          align: "left",
          field: (row) => row.banca,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["admin"]),
  },
};
</script>

<style></style>

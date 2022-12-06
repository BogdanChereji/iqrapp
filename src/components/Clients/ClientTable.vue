<template>
  <div>
    <q-table
      class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow"
      table-header-class="bg-primary text-white"
      title="Clienți"
      :data="clients"
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
  props: ["clients", "id"],

  methods: {
    onRowClick(evt, row) {
      console.log("clicked on", row.nume);
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.clients.map((row) =>
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

      showEditClient: false,
      visibleColumns: [
        "codclient",
        "nume",
        "CIF",
        "telefon",
        "email",
        "contact",
        "action",
      ],
      columns: [
        {
          name: "codclient",
          label: "Cod Client",
          align: "left",
          field: (row) => row.codclient,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "nume",
          label: "Denumire client",
          align: "left",
          field: (row) => row.nume,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "CIF",
          label: "CIF",
          align: "left",
          field: (row) => row.cif,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "telefon",
          label: "Telefon",
          align: "left",
          field: (row) => row.telefon,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          align: "left",
          field: (row) => row.email,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "contact",
          label: "Contact",
          align: "left",
          field: (row) => row.contact,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "reg",
          label: "Reg",
          align: "left",
          field: (row) => row.reg,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "tva",
          label: "Tva",
          align: "left",
          field: (row) => row.tva,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "adresa",
          label: "Adresa",
          align: "left",
          field: (row) => row.adresa,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "localitate",
          label: "Localitate",
          align: "left",
          field: (row) => row.localitate,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "judet",
          label: "Judet",
          align: "left",
          field: (row) => row.judet,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "iban",
          label: "IBAN",
          align: "left",
          field: (row) => row.iban,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "banca",
          label: "Banca",
          align: "left",
          field: (row) => row.banca,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
    };
  },
};
</script>

<style></style>

import { Dialog, Loading } from "quasar";

export function showErrorMessageRegister(errorMessage) {
  Loading.hide();
  Dialog.create({
    title: "Eroare",
    message:
      "Adresa de email a mai fost folosită în trecut sau nu este o adresă validă!",
  });
}

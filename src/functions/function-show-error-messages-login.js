import { Dialog, Loading } from "quasar";

export function showErrorMessageLogin(errorMessage) {
  Loading.hide();
  Dialog.create({
    title: "Eroare",
    message: "Adresa de email și/ sau parola nu se potrivesc",
  });
}

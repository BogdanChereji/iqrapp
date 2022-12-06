<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} pentru a avea acces la aplicație
        <template v-slot:action> </template>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        class="col"
        v-model="formData.email"
        label="Email"
        stack-label
        ref="email"
        :rules="[
          (val) =>
            isValidEmailAdress(val) || 'Introduceți o adresă de email validă',
        ]"
        lazy-rules
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        type="password"
        outlined
        ref="password"
        class="col"
        v-model="formData.password"
        label="Parola"
        stack-label
        lazy-rules
        :rules="[
          (val) =>
            val.length > 8 || 'Parola trebuie să conțină minim 8 caractere',
        ]"
      />
    </div>
    <div class="row">
      <q-space />

      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "logInUser"]),

    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.logInUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },
    isValidEmailAdress(email) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="fill-height"
  >
    <v-container class="fill-height">
      <v-row class="justify-center">
        <v-sheet
          elevation="8"
          height="320"
          width="600"
          class="d-flex align-center"
        >
          <v-col>
            <v-text-field
              v-model="login"
              label="Login"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required]"
              label="Password"
              @click:append="show = !show"
              @keyup.enter="LogIn"
            ></v-text-field>
            <v-row class="justify-center ma-10">
              <v-btn
                color="teal"
                dark
                elevation="7"
                large
                :disabled="!valid"
                @click="LogIn"
              >Sign In
              </v-btn>
            </v-row>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import router from "@/router";

export default Vue.extend({
  name: 'SignIn',

  data() {
    return {
      show: false,
      login: '',
      password: '',
      valid: true,
      rules: {
        required: (value: unknown) => !!value || 'Required.'
      }
    }
  },
  methods: {
    LogIn() {
      if (this.login === 'admin' && this.password === 'admin') {
        router.push('/weather')
      } else {
        alert("We dont have such account")
      }
    }
  }
})
</script>
<style>
</style>

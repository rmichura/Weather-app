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
        >
          <v-col style="margin-top: 2em">
            <v-text-field
              v-model="login"
              label="Login"
              :rules="[rules.required]"
              @click.stop="alert = false"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required]"
              label="Password"
              @click:append="show = !show"
              @click.stop="alert = false"
              @keyup.enter="LogIn"
            ></v-text-field>
            <v-row class="justify-center">
              <v-alert
                v-model="alert"
                type="error"
                dense
                outlined
                style="margin-bottom: -1em; margin-top: 0.5em"
              >
                We dont have such an account
              </v-alert>
            </v-row>
            <v-row class="justify-center" style="margin-top: 3em">
              <v-btn
                color="teal"
                elevation="7"
                style="color: white"
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
      alert: false,
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
        this.alert = true
        // alert("We dont have such account")
      }
    }
  }
})
</script>
<style>
</style>

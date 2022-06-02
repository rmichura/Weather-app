<template>
  <sign-in />
</template>

<script lang="ts">
import Vue from 'vue'
import SignIn from '../components/SignIn.vue'

export default Vue.extend({
  name: 'HomeView',

  components: {
    SignIn
  }
})
</script>

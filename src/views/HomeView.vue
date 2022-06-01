<template>
  <hello-world />
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '../components/SignIn.vue'

export default Vue.extend({
  name: 'HomeView',

  components: {
    HelloWorld
  }
})
</script>

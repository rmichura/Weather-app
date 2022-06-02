<template>
  <v-container>
    <v-row class="justify-center">
      <span style="font-size: 40px; margin-top: 1em; margin-bottom: 1em">Weather <span
        style="color: teal">Forecast</span></span>
    </v-row>
    <v-row class="justify-center">
      <v-col
        v-for="(city, index) in $store.state.cityFromApi"
        :key="index"
        style="flex-grow: 0"
      >
        <v-card
          height="200"
          width="200"
          class="ma-1"
          style="border-radius: 10px;"
          color="teal"
        >
          <v-row class="ma-1">
            <v-layout class="justify-center" style="width: 200px;">
              <span style="color: white; margin: 5px; font-size: 30px">{{ city.name }}</span>
            </v-layout>
            <v-layout class="justify-center" style="width: 200px; color: white">
              <span style="font-size: 25px">{{ city.main.temp }}</span>
              <v-icon color="white">mdi-temperature-celsius</v-icon>
            </v-layout>
            <v-layout class="justify-center ma-2" style="width: 200px; color: white">
              <span style="font-size: 20px">{{ city.main.humidity }}</span>
              <v-icon color="white">mdi-percent</v-icon>
            </v-layout>
            <v-layout class="justify-center" style="width: 200px">
              <v-btn
                color="white"
                outlined
                class="ma-2"
                @click.stop="drawer = !drawer"
              >
                More
              </v-btn>
            </v-layout>
          </v-row>
        </v-card>
      </v-col>
      <v-btn
        height="200"
        width="150"
        style="border: 2px solid black; border-radius: 10px; background-color: white; margin-top: 1.2em; margin-left: 1em"
        @click.stop="dialog = true"
        @click="test"
      >
        <v-icon
          color="teal">
          mdi-plus
        </v-icon>
        <span style="color: teal">Add City</span>
      </v-btn>
    </v-row>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      app
      width="600"
    >

    </v-navigation-drawer>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          dark
          color="teal"
        >
          <v-icon>
            mdi-magnify
          </v-icon>
          <v-autocomplete
            v-model="select"
            :items="cities"
            item-text="name"
            item-value="id"
            return-object
            class="mx-4"
            cache-items
            flat
            hide-no-data
            hide-details
            label="Search places"
            solo-inverted
          ></v-autocomplete>
        </v-toolbar>
        <v-card-actions>
          <v-row class="justify-center ma-2">
            <v-btn
              color="teal"
              outlined
              block
              @click="addCity"
            >
              Add
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  name: "WeatherView",

  data() {
    return {
      dialog: false,
      select: null,
      lat: '',
      lon: '',
      drawer: null
    }
  },
  computed: {
    cities() {
      return this.$store.getters.getCityList
    },
    myCities() {
      return this.$store.getters.getMyCity
    },
    cityFromApi() {
      return this.$store.getters.getCityFromApi
    },
  },
  methods: {
    async addCity() {
      this.dialog = false

      for (let repeatCiy of this.$store.state.myCity) {
        if (repeatCiy.id === this.select.id) {
          return alert("You have such already city")
        }
      }
      this.$store.state.myCity.push(this.select)
      // await this.$store.dispatch('currentCity')
      for (let coord of this.$store.state.myCity) {
        this.lat = coord.coord.lat
        this.lon = coord.coord.lon
      }
      try {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=555e67159798f21c4b0a6c81f18ad428&units=metric`)
        this.$store.state.cityFromApi.push(response.data)
      } catch (e) {
        console.log(e)
      }
      this.select = ''
    },
    test() {
      console.log()
    }
  }
}
</script>

<style scoped>

</style>

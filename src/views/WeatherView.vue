<template>
  <v-container>
    <v-row class="justify-center">
      <span style="font-size: 40px; margin-top: 1em; margin-bottom: 1em; color: #ff5b00">Weather <span
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
              <span style="font-size: 20px">Humidity: {{ city.main.humidity }}</span>
              <v-icon color="white">mdi-percent</v-icon>
            </v-layout>
            <v-layout class="justify-center" style="width: 200px">
              <v-btn
                color="white"
                outlined
                class="ma-2"
                @click.stop="drawer = !drawer"
                @click="moreInformation(index)"
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
        style="border: 2px solid teal; border-radius: 10px; background-color: white; margin-top: 1.2em; margin-left: 1em"
        @click.stop="dialog = true"
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
      src="https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg"
    >
      <v-row class="d-flex align-center justify-center ma-2">
        <span style="font-size: 15px; color: white; margin-top: 10em">Weather: {{ description }}</span>
      </v-row>
      <v-row class="justify-center">
          <span
            style="color: white; font-size: 50px;"
          >{{ temp }}
          <v-icon size="40" color="white" style="margin-top: -0.5em"
          >
            mdi-temperature-celsius
          </v-icon>
        </span>
      </v-row>
      <v-row class="justify-center" style="margin-bottom: 0.5em">
        <span style="font-size: 25px; color: white">{{ city }} <v-icon color="white" size="30">mdi-circle-small</v-icon><span
          style="font-size: 20px">{{ country }}</span></span>
      </v-row>
      <v-row class="justify-center ma-2">
        <span style="font-size: 15px; color: white">Feels like: {{ feelLike }}</span>
      </v-row>
      <v-row class="justify-center ma-2">
        <span style="font-size: 15px; color: white">Temp min: {{ tempMin }} <v-icon
          color="white">mdi-circle-small</v-icon> Temp max: {{ tempMax }}</span>
      </v-row>
      <v-row class="justify-center ma-2">
        <span style="font-size: 15px; color: white">Atmospheric pressure: {{ atmosphericPressure }} hPa</span>
      </v-row>
      <v-row class="justify-center ma-2">
        <span style="font-size: 15px; color: white">Wind speed: {{ windSpeed }} m/s</span>
      </v-row>
    </v-navigation-drawer>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        height="200"
      >
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
              style="margin-top: 3em"
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
      drawer: null,
      temp: '',
      tempMin: '',
      tempMax: '',
      city: '',
      country: '',
      feelLike: '',
      windSpeed: '',
      atmosphericPressure: '',
      description: ''

    }
  },
  computed: {
    cities() {
      return this.$store.getters.getCityList
    },
    cityFromApi() {
      return this.$store.getters.getCityFromApi
    },
  },
  methods: {
    async addCity() {
      this.dialog = false

      for (let repeatCiy of this.$store.getters.getMyCity) {
        if (repeatCiy.id === this.select.id) {
          this.select = ''
          return alert("You have such already city")
        }
      }
      this.$store.commit('setMyCity', this.select)
      for (let coords of this.$store.state.myCity) {
        this.$store.commit('setLat', coords.coord.lat)
        this.$store.commit('setLon', coords.coord.lon)
      }
      try {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.$store.getters.getLat}&lon=${this.$store.getters.getLon}&appid=555e67159798f21c4b0a6c81f18ad428&units=metric`)
        this.$store.commit('setCityFromApi', response.data)
      } catch (e) {
        console.log(e)
      }
      await this.refreshMyCity()
      this.select = ''
    },
    moreInformation(index) {
      this.city = this.$store.getters.getCityFromApi[index].name
      this.temp = this.$store.getters.getCityFromApi[index].main.temp
      this.tempMin = this.$store.getters.getCityFromApi[index].main.temp_min
      this.tempMax = this.$store.getters.getCityFromApi[index].main.temp_max
      this.feelLike = this.$store.getters.getCityFromApi[index].main.feels_like
      this.windSpeed = this.$store.getters.getCityFromApi[index].wind.speed
      this.country = this.$store.getters.getCityFromApi[index].sys.country
      this.atmosphericPressure = this.$store.getters.getCityFromApi[index].main.pressure
      this.description = this.$store.getters.getCityFromApi[index].weather[0].description
    },
    async refreshMyCity() {
      if (this.$store.getters.getMyCity.length > 0) {
        this.$store.commit('setCityFromApiToEmpty', [])
        for (let cityFormArray of this.$store.getters.getMyCity) {
          let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityFormArray.coord.lat}&lon=${cityFormArray.coord.lon}&appid=555e67159798f21c4b0a6c81f18ad428&units=metric`)
          this.$store.commit('setCityFromApi', response.data)
        }
      }
      setTimeout(() => {
        this.refreshMyCity()
      }, 60000)
    }
  }
}
</script>

<style scoped>

</style>

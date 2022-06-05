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
              <span style="color: white; margin: 5px; font-size: 30px">{{ city.city.name }}</span>
            </v-layout>
            <v-layout class="justify-center" style="width: 200px; color: white">
              <span style="font-size: 25px">{{ city.list[0].main.temp }}</span>
              <v-icon color="white">mdi-temperature-celsius</v-icon>
            </v-layout>
            <v-layout class="justify-center ma-2" style="width: 200px; color: white">
              <span style="font-size: 20px">Humidity: {{ city.list[0].main.humidity }}</span>
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
        style="border: 2px solid teal; border-radius: 10px; background-color: white; margin-top: 1.2em; margin-left: 1em; margin-bottom: 1em"
        @click.stop="dialog = true; alert = false; alertTenCity = false"
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
      <v-card style="margin-left: 4em; margin-right: 4em; margin-top: 2em;" class="transparent">
        <v-sparkline
          :value="temperatures"
          :labels="dates"
          :show-labels="true"
          color="white"
          height="120"
          padding="12"
          smooth
          auto-draw
          :label-size="9"
        >
        </v-sparkline>
        <v-sparkline
          style="position: absolute; top: 0; left: 0"
          :value="humidity"
          color="teal"
          height="120"
          padding="12"
          smooth
          auto-draw
          :label-size="9"
        >
        </v-sparkline>
      </v-card>
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
            <v-alert
              v-model="alert"
              type="error"
              dense
              outlined
              style="margin-bottom: -0.5em"
            >
              You have already such city
            </v-alert>
            <v-alert
              v-model="alertTenCity"
              type="error"
              dense
              outlined
              style="margin-bottom: -0.5em"
            >
              You can only add ten cities
            </v-alert>
            <v-btn
              style="margin-top: 1.5em"
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
      description: '',
      dates: [],
      temperatures: [],
      humidity: [],
      alert: false,
      alertTenCity: false,
    }
  },
  computed: {
    cities() {
      return this.$store.getters.getCityList
    },
    cityFromApi() {
      return this.$store.getters.getCityFromApi
    },
    auth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    async addCity() {
      this.dialog = false
      if (this.$store.getters.getMyCity.length < 10) {
        for (let repeatCiy of this.$store.getters.getMyCity) {
          if (repeatCiy.id === this.select.id) {
            this.select = ''
            this.dialog = true
            this.alert = true
          }
        }
        if (this.select === '') {
          return
        } else {
          this.$store.commit('setMyCity', this.select)
          for (let coords of this.$store.state.myCity) {
            this.$store.commit('setLat', coords.coord.lat)
            this.$store.commit('setLon', coords.coord.lon)
          }
          try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.$store.getters.getLat}&lon=${this.$store.getters.getLon}&appid=555e67159798f21c4b0a6c81f18ad428&units=metric`)
            this.$store.commit('setCityFromApi', response.data)
          } catch (e) {
            console.log(e)
          }
          this.refreshMyCity().catch(e => {
            console.log(e)
          })
          this.select = ''
        }
      } else {
        this.select = ''
        this.dialog = true
        this.alertTenCity = true
      }
    },
    moreInformation(index) {
      let gettersFromApi = this.$store.getters.getCityFromApi[index]
      this.city = gettersFromApi.city.name
      this.temp = gettersFromApi.list[0].main.temp
      this.tempMin = gettersFromApi.list[0].main.temp_min
      this.tempMax = gettersFromApi.list[0].main.temp_max
      this.feelLike = gettersFromApi.list[0].main.feels_like
      this.windSpeed = gettersFromApi.list[0].wind.speed
      this.country = gettersFromApi.city.country
      this.atmosphericPressure = gettersFromApi.list[0].main.pressure
      this.description = gettersFromApi.list[0].weather[0].description

      this.dates = []
      this.temperatures = []
      this.humidity = []
      for (let i = 0; i < 8; i++) {
        this.dates.push(gettersFromApi.list[i].dt_txt.slice(11, -3))
        this.temperatures.push(gettersFromApi.list[i].main.temp)
        this.humidity.push(gettersFromApi.list[i].main.humidity)
      }
    },

    async refreshMyCity() {
      if (this.$store.getters.getMyCity.length > 0) {
        this.$store.commit('setCityFromApiToEmpty', [])
        for (let cityFormArray of this.$store.getters.getMyCity) {
          let response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityFormArray.coord.lat}&lon=${cityFormArray.coord.lon}&appid=555e67159798f21c4b0a6c81f18ad428&units=metric`)
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

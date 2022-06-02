import Vue from 'vue'
import Vuex from 'vuex'
import cityList from "../../city.json";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityList: cityList,
    myCity: [],
    cityFromApi: [],
    lat: '',
    lon: '',
  },
  getters: {
    getCityList(state) {
      return state.cityList
    },
    getMyCity(state) {
      return state.myCity
    },
    getCityFromApi(state) {
      return state.cityFromApi
    }
  },
  mutations: {
  },
  actions: {
    // currentCity: async function ({state}) {
    //   try {
    //     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&appid=555e67159798f21c4b0a6c81f18ad428&units=metric`)
    //     state.cityFromApi.push(response as any)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  },
  modules: {
  }
})

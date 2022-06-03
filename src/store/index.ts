import Vue from 'vue'
import Vuex from 'vuex'
import cityList from "../../city.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityList: cityList,
    myCity: [],
    cityFromApi: [],
    lat: null,
    lon: null,
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
    },
    getLat(state) {
      return state.lat
    },
    getLon(state) {
      return state.lon
    }
  },
  mutations: {
    setLat(state, payload) {
      state.lat = payload
    },
    setLon(state, payload) {
      state.lon = payload
    },
    setMyCity(state: any, payload: []) {
      state.myCity.push(payload);
    },
    setCityFromApi(state: any, payload: []) {
      state.cityFromApi.push(payload);
    },
    setCityFromApiToEmpty(state, payload) {
      state.cityFromApi = payload
    },
  },
  actions: {},
  modules: {}
})

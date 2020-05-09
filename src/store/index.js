// prettier-ignore
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myLocation: {
      lat: 0,
      lng: 0
    },
    myAddress: 'Address',
    showAnimation: false,
    showMap: false
  },
  mutations: {
    changeLocation(state, payload) {
      state.myLocation.lat = payload.lat
      state.myLocation.lng = payload.lng
    },
    changeAddress(state, address) {
      state.myAddress = address
    },
    showAnimation(state, isShow) {
      state.showAnimation = isShow
    },
    showMapMutation(state, isShow) {
      state.showMap = isShow
    }
  },
  actions: {
    getLocation({ dispatch, commit }) {
      commit('showAnimation', true)
      commit('showMapMutation', false)
      navigator.geolocation.getCurrentPosition(
        async data => {
          const coordinates = await data.coords
          const coords = {
            lat: coordinates.latitude,
            lng: coordinates.longitude
          }
          commit('changeLocation', coords)
          dispatch('findAddressFromCoords', coords)
          commit('showAnimation', false)
          commit('showMapMutation', true)
        },
        error => {
          alert(error.message)
          commit('showAnimation', false)
        }
      )
    },

    async findAddressFromCoords({ commit }, coords) {
      const data = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
      )
      // response json oluyor
      const response = await data.json()
      const address = response.display_name
      commit('changeAddress', address)
    },

    async findCoordsFromAddress({ commit }, address) {
      commit('showAnimation', true)
      commit('showMapMutation', false)
      const uri = encodeURI(
        `https://nominatim.openstreetmap.org/search/${address}?format=json`
      )
      const data = await fetch(uri)
      const responseArray = await data.json()
      if (!responseArray || responseArray.length === 0) {
        throw new Error('!Failed to fetch coordinates, Please try again')
      }
      const coords = {
        lat: responseArray[0].lat,
        lng: responseArray[0].lon
      }
      commit('changeLocation', coords)
      commit('changeAddress', address)
      commit('showAnimation', false)
      commit('showMapMutation', true)
    }
  },
  modules: {}
})

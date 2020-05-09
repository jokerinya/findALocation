<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import { mapState } from "vuex";

export default {
  name: "Map",
  data() {
    return {};
  },

  computed: {
    ...mapState(["showMap", "myLocation"]),
    coords() {
      return [this.myLocation.lat, this.myLocation.lng];
    }
  },

  mounted() {
    const map = L.map("map").setView(this.coords, 15);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoiam9rZXJpbnlhMjAxMyIsImEiOiJjazhzbjh3ZHIwMTl4M2ZsazMzZG44dWU5In0.L5-PUpGg59GgQWBEVFdOXQ"
      }
    ).addTo(map);
    // const marker = L.marker(coords).addTo(this.map);
    let marker = L.marker(this.coords).addTo(map);
    marker.bindPopup("<b>Hello!</b><br>Here I am.").openPopup();
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
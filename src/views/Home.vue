<template>
  <div class="home">
    <header>
      <h1>Share a Place!</h1>
    </header>

    <Loading v-show="this.showAnimation" />

    <section id="selected-place">
      <p v-if="!this.showMap">
        You haven't selected any place yet. Please enter an address or locate
        yourself!
      </p>
      <Map v-else />
    </section>

    <section id="share-controls">
      <input id="share-link" type="text" readonly :value="field" />
      <button id="share-btn" :disabled="!this.showMap" @click="copyText">Share Place</button>
    </section>

    <section id="place-data">
      <form>
        <label for="address">Address</label>
        <input type="text" v-model="enteredAddress" />
        <button type="submit" @click.prevent="getCoordsFromAddress">Find Place</button>
      </form>
      <button id="locate-btn" @click="getMyLocation">Get Current Location</button>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from "./components/Map";
import Loading from "./components/Loading";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    Map,
    Loading
  },
  data() {
    return {
      place: "Select a place to get a sharable link.",
      enteredAddress: ""
    };
  },
  computed: {
    ...mapState(["myAddress", "myLocation", "showMap", "showAnimation"]),
    field() {
      if (this.showMap) {
        return `${location.origin}/share?address=${encodeURI(
          this.myAddress
        )}&lat=${this.myLocation.lat}&lon=${this.myLocation.lng}`;
      } else {
        return this.place;
      }
    }
  },
  methods: {
    ...mapMutations([
      "showMapMutation" //also supports payload `this.nameOfMutation(amount)`
    ]),
    ...mapActions([
      "getLocation", //also supports payload `this.nameOfAction(amount)`
      "findCoordsFromAddress"
    ]),
    getMyLocation() {
      if (!navigator.geolocation) {
        alert("!Your Browser Does Not Support This Specialty");
        return;
      }
      this.getLocation();
    },

    getCoordsFromAddress() {
      this.findCoordsFromAddress(this.enteredAddress);
    },

    copyText() {
      if (!navigator.clipboard) {
        alert("Please Select Manually!");
        return;
      }
      navigator.clipboard
        .writeText(this.field)
        .then(alert("Copied to clipboard!"))
        .catch(error => {
          console.log(error);
          document.getElementById("share-link").select();
        });

      this.$router.push(
        `/share?address=${encodeURI(this.myAddress)}&lat=${
          this.myLocation.lat
        }&lon=${this.myLocation.lng}`
      );
    }
  }
};
</script>

<style>
#selected-place {
  width: 40rem;
  height: 25rem;
  max-width: 90%;
  margin: 2rem auto;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

#share-controls {
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}

#share-controls a {
  text-decoration: none;
  font-size: 1.25rem;
  background: #36007c;
  color: white;
  border: 1px solid #36007c;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
}

#share-controls a:focus {
  outline: none;
}

#share-controls a:hover,
#share-controls a:active {
  background: #55007c;
  border-color: #55007c;
}

#share-controls input {
  font-size: 1.15rem;
}

#place-data {
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}
label,
input {
  display: block;
  width: 100%;
}

label {
  font-weight: bold;
  margin: 0.5rem 0;
}

input {
  font: inherit;
  padding: 0.15rem 0.25rem;
  border: 1px solid #ccc;
  font-size: 3rem;
  text-align: center;
  color: #696969;
}
</style>
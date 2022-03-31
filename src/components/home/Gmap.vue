<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";
import {
  collection,
  where,
  doc,
  updateDoc,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";

export default {
  name: "Gmap",
  data() {
    return {
      lat: 53,
      lng: -2,
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      });

      getDocs(collection(db, "users")).then((users) => {
        users.forEach((doc) => {
          let data = doc.data();
          if (data.geolocation) {
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng,
              },
              map,
            });

            marker.addListener("click", () => {
              this.$router.push({
                name: "ViewProfile",
                params: { id: doc.id },
              });
            });
          }
        });
      });
    },
  },
  mounted() {
    let user = getAuth().currentUser;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          const q = query(
            collection(db, "users"),
            where("user_id", "==", user.uid)
          );

          getDocs(q)
            .then((snapshot) => {
              snapshot.forEach((document) => {
                updateDoc(doc(db, "users", document.id), {
                  geolocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  },
                });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        (err) => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.renderMap();
    }

    this.renderMap();
    console.log(getAuth().currentUser);
  },
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>

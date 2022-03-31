<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'HomeView' }" class="brand-logo left"
          >Geo Auth App</router-link
        >
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }"> Signup </router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }"> Login </router-link>
          </li>
          <li v-if="user">
            <a> {{ user.email }} </a>
          </li>
          <li v-if="user"><a href="#" @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return { user: null };
  },
  methods: {
    logout() {
      getAuth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
  created() {
    getAuth().onAuthStateChanged((user) => {
      console.log(user.email);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

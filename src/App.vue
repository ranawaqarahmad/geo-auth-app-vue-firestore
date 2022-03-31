<template>
  <Navbar />
  <RouterView />
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  background-color: #ddd;
}
</style>

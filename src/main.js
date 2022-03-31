import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getAuth } from "firebase/auth";

let app = null;

getAuth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(router);

    app.mount("#app");
  }
});

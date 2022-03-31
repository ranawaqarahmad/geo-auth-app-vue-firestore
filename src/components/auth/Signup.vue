<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">SignUp</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">SignUp</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "../../firebase/init";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null,
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        let docRef = getDoc(doc(db, "users", this.slug));
        docRef.then((docs) => {
          console.log(docs.data());
          if (docs.exists()) {
            this.feedback = "This alias already Exists";
          } else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
              .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", this.slug), {
                  alias: this.alias,
                  geolocation: null,
                  user_id: user.uid,
                });
              })
              .then(() => {
                this.$router.push({ name: "HomeView" });
              })
              .catch((err) => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "This alias is Free to Use";
          }
        });
        console.log(this.slug);
      } else {
        this.feedback = "You have to enter the alias";
      }
    },
  },
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>

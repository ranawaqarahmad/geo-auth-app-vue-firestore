<template>
  <div class="view-profile container">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment" />
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: [],
    };
  },
  methods: {
    addComment() {
      if (this.newComment) {
        addDoc(collection(db, "comments"), {
          to: this.$route.params.id,
          from: this.user.id,
          content: this.newComment,
          time: Date.now(),
        });
        this.feedback = null;
      } else {
        this.feedback = "You must enter a comment  to add it";
      }
    },
  },
  created() {
    let docRef = doc(db, "users", this.$route.params.id);

    const q = query(
      collection(db, "users"),
      where("user_id", "==", getAuth().currentUser.uid)
    );

    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        (this.user = doc.data()), (this.user.id = doc.id);
      });
    });

    getDoc(docRef).then((user) => {
      console.log(user);
      this.profile = user.data();
    });

    const commentsQuery = query(
      collection(db, "comments"),
      where("to", "==", this.$route.params.id)
    );
    onSnapshot(commentsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content,
          });
        }
      });
    });
  },
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}

.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}

.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>

<template>
  <article class="post__item" @click="$router.push(`post/${id}`)">
    <button @click.stop="removePost" class="post__remove-button"><img src="@/img/remove-icon.svg" alt="remove"></button>
    <p class="post__title">{{ title }}</p>
    <p class="post__text">{{ body }}</p>
    <p class="post__author">{{ user ? user.username : 'Гость' }}</p>
  </article>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    removePost() {
      this.$store.dispatch('post/deletePost', this.id);
    }
  },
  computed: {
    ...mapState({
      users: state => state.post.users
    }),
    user() {
      return this.users.find(user => user.id === this.id);
    }
  }
};
</script>

<style scoped>
.post__item {
  border: 1px solid #181aa1;
  color: #181aa1;
  padding: 15px;
  border-radius: 5px;
  font-family: sans-serif;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
}
.post__item:hover {
  background-color: #181aa1;
  color: #fff;
}
.post__title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
}
.post__text {
  margin-bottom: 15px;
}
.post__author {
  color: #000;
  font-style: italic;
  text-align: right;
}
.post__remove-button {
  width: 25px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: auto;
  display: block;
}
</style>

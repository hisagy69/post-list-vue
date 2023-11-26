<template>
  <div class="posts__list">
      <post-item
        v-for="post in posts"
        :title="post.title"
        :body="post.body"
        :user="user(post.userId)"
        :id="post.id"
        :key="post.id"
      ></post-item>
  </div>
</template>

<script>
import postItem from '@/components/postItem';
export default {
  components: {
    postItem
  },
  props: {
    posts: {
      type: Array,
      default: []
    },
    users: {
      type:Array,
      default: []
    }
  },
  methods: {
    user(id) {
      return this.users.find(user => user.id === id);
    }
  }
}
</script>

<style scoped>
.posts__list {
  margin: 0 auto;
  max-width: 100%;
}
</style>

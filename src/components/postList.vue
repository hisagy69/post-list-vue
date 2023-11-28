<template>
  <div class="posts__list">
    <transition-group
      name="list"
    >
      <post-item
        v-for="post in posts"
        :title="post.title"
        :body="post.body"
        :user="user(post.userId)"
        :id="post.id"
        :key="post.id"
        @delete="removePost"
      ></post-item>
    </transition-group>
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
    },
    removePost(id) {
      this.$emit('delete', id);
    }
  },
}
</script>

<style scoped>
.posts__list {
  margin: 0 auto;
  max-width: 100%;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

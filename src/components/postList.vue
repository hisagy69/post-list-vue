<template>
  <div class="posts__list">
    <transition-group
      name="list"
    >
      <post-item
        v-for="post in postsSortedSearch"
        :title="post.title"
        :body="post.body"
        :id="post.id"
        :key="post.id"
      ></post-item>
    </transition-group>
  </div>
</template>

<script>
import postItem from '@/components/postItem';
import {mapState, mapGetters} from 'vuex';
export default {
  components: {
    postItem
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts
    }),
    ...mapGetters({
      postsSortedSearch: 'post/postsSortedSearch'
    })
  }
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

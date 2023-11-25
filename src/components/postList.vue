<template>
  <div class="posts__list">
      <post-item
        v-for="post in posts"
        :title="post.title"
        :description="post.description"
      ></post-item>
  </div>
</template>

<script>
import postItem from '@/components/postItem';
export default {
  components: {
    postItem
  },
  data() {
    return {
      posts: [
        {
          title: 'Название поста 1',
          description: 'Текст поста 1'
        },
        {
          title: 'Название поста 2',
          description: 'Текст поста 2'
        }
      ]
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

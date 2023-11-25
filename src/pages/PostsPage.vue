<template>
  <div class="posts">
    <my-title>Главная</my-title>
    <my-button class="posts__add-button">Добавить пост</my-button>
    <post-list/>
  </div>
</template>

<script>
import postList from '@/components/postList';

export default {
  components: {
    postList
  }
}
</script>

<style scoped>
.posts {
  max-width: 960px;
  margin: 0 auto;
}
.posts__add-button {
  display: block;
  margin-left: auto;
  margin-bottom: 15px;
}
</style>

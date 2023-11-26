<template>
  <div class="posts">
    <my-title>Главная</my-title>
    <my-button class="posts__add-button">Добавить пост</my-button>
    <post-list v-if="!isLoadData" :posts="posts" :users="users"/>
    <div v-else class="posts__load">Загрузка постов...</div>
  </div>
</template>

<script>
import postList from '@/components/postList';

export default {
  data() {
    return {
      posts: [],
      users: [],
      page: 1,
      limit: 10,
      isLoadData: false
    }
  },
  components: {
    postList
  },
  methods: {
    fetchPosts() {
      this.isLoadData = true;
      return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
        .then(response => response.json())
        .then(json => this.posts = json);
    },
    fetchUsers() {
      this.isLoadData = true;
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => this.users = json);
    }
  },
  mounted() {
      Promise.all([this.fetchPosts(), this.fetchUsers()])
        .then(() => this.isLoadData = false)
        .catch(e => console.error(e));
  }
}
</script>

<style scoped>
.posts__add-button {
  display: block;
  margin-left: auto;
  margin-bottom: 15px;
}
.posts__load {
  font-size: 50px;
  color: #181aa1;
}
</style>

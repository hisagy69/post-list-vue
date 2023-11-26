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
      totalPages: 0,
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
        .then(response => {
          this.totalPages = response.headers.get('x-total-count') / this.limit;
          return response.json()
        })
        .then(json => this.posts = [...this.posts, ...json])
        .catch(e => console.error(e));
    },
    fetchUsers() {
      this.isLoadData = true;
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => this.users = json)
        .catch(e => console.error(e));
    },
    loadMorePosts() {
      if (this.totalPages > this.page && !this.isLoadData) {
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = screenHeight - height / 4;
        const position = scrolled + screenHeight;
        if (position >= threshold) {
          this.page += 1;
          this.fetchPosts();
          this.isLoadData = false;
        }
      }
    }
  },
  mounted() {
    Promise.all([this.fetchPosts(), this.fetchUsers()])
      .then(() => this.isLoadData = false);
    document.addEventListener('scroll', this.loadMorePosts);
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

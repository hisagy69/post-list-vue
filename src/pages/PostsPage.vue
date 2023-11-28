<template>
  <div class="posts">
    <my-title>Главная</my-title>
    <div class="posts__interface">
      <my-select
        v-model="activeSortOption"
        :options="sortOptions"
      />
      <my-button
        class="posts__add-button"
        @click="modalAdd"
      >Добавить пост</my-button>
    </div>
    <transition name="fade">
      <my-modal
        v-if="modalVisible"
        @update:show="modalClose"
      >
        <post-form
          @update="addPost"
        />
      </my-modal>
    </transition>
    <post-list v-if="!isLoadData" :posts="postsSorted" :users="users"/>
    <div v-else class="posts__load">Загрузка постов...</div>
  </div>
</template>

<script>
import postList from '@/components/postList';
import postForm from '@/components/postForm';

export default {
  data() {
    return {
      posts: [],
      users: [],
      totalPages: 0,
      page: 1,
      limit: 10,
      isLoadData: false,
      modalVisible: false,
      activeSortOption: '',
      sortOptions: [
        {
          name: 'По названию',
          value: 'title'
        },
        {
          name: 'По тексту',
          value: 'body'
        }
      ]
    }
  },
  components: {
    postList,
    postForm
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
    },
    modalAdd() {
      this.modalVisible = true;
    },
    modalClose() {
      this.modalVisible = false;
    },
    addPost(post) {
      this.modalClose();
      this.posts = [post, ...this.posts]
    },
  },
  computed: {
    postsSorted() {
      return [...this.posts].sort((post1, post2) => 
        post1[this.activeSortOption]?.localeCompare(post2[this.activeSortOption]));
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
.posts__interface {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 15px;
}
.posts__load {
  font-size: 50px;
  color: #181aa1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="posts">
    <my-title>Главная</my-title>
    <div class="posts__interface">
      <my-select
        :model-value="activeSortOption"
        @update:model-value="setActiveSort"
        :options="sortOptions"
      />
      <my-button
        class="posts__add-button"
        @click="modalAdd"
      >Добавить пост</my-button>
    </div>
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск"
      class="posts__search"
    />
    <transition name="fade">
      <my-modal
        v-if="modalVisible"
        @update:show="modalClose"
      >
        <post-form
          @update="modalClose"
        />
      </my-modal>
    </transition>
    <post-list
      v-if="!isLoadData"
      :posts="postsSortedSearch"
      :users="users"
      @delete="removePost"/>
    <div v-else class="posts__load">Загрузка постов...</div>
  </div>
</template>

<script>
import postList from '@/components/postList';
import postForm from '@/components/postForm';

export default {
  data() {
    return {
      modalVisible: false,
    }
  },
  components: {
    postList,
    postForm
  },
  methods: {
    loadMorePosts() {
      if (this.$store.state.post.totalPages > this.$store.state.post.page && !this.$store.state.post.isLoadData) {
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = screenHeight - height / 4;
        const position = scrolled + screenHeight;
        if (position >= threshold) {
          this.$store.commit('post/setPage', this.$store.state.post.page + 1);
          this.$store.dispatch('post/fetchPosts');
          this.$store.commit('post/setIsLoadData', false);
        }
      }
    },
    modalAdd() {
      this.modalVisible = true;
    },
    modalClose() {
      this.modalVisible = false;
    },
    removePost(id) {
      this.$store.commit('post/removePost', id);
    },
    setActiveSort(activeSort) {
      this.$store.commit('post/setActiveSortOption', activeSort);
    },
    setSearchQuery(query) {
      this.$store.commit('post/setSearchQuery', query);
    }
  },
  computed: {
    activeSortOption() {
      return this.$store.state.post.activeSortOption;
    },
    sortOptions() {
      return this.$store.state.post.sortOptions;
    },
    searchQuery() {
      return this.$store.state.post.searchQuery;
    },
    isLoadData() {
      return this.$store.state.post.isLoadData;
    },
    postsSortedSearch() {
      return this.$store.getters['post/postsSortedSearch'];
    },
    users() {
      return this.$store.state.post.users;
    }
  },
  mounted() {
    Promise.all([this.$store.dispatch('post/fetchPosts'), this.$store.dispatch('post/fetchUsers')])
      .then(() => this.$store.commit('post/setIsLoadData', false));
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
.posts__search {
  width: 100%;
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

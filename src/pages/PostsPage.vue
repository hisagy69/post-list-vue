<template>
  <div class="posts">
    <my-title>Главная</my-title>
    <div class="posts__interface">
      <my-select
        :model-value="activeSortOption"
        @update:model-value="setActiveSortOption"
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
    <post-list v-if="!isLoadData"/>
    <div v-else class="posts__load">Загрузка постов...</div>
  </div>
</template>

<script>
import postList from '@/components/postList';
import postForm from '@/components/postForm';
import {mapState, mapActions, mapMutations} from 'vuex';

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
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      fetchUsers: 'user/fetchUsers'
    }),
    ...mapMutations({
      setActiveSortOption: 'post/setActiveSortOption',
      setSearchQuery: 'post/setSearchQuery'
    }),
    modalAdd() {
      this.modalVisible = true;
    },
    modalClose() {
      this.modalVisible = false;
    }
  },
  computed: {
    ...mapState({
      activeSortOption: state => state.post.activeSortOption,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      isLoadData: state => state.post.isLoadData && state.user.isLoadData,
    }),
  },
  mounted() {
    this.fetchPosts();
    this.fetchUsers();
  }
}
</script>

<style scoped>
.posts {
  overflow-y: hidden;
  height: 100vh;
}
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

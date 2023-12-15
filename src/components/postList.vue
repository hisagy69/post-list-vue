<template>
  <div class="posts__list" ref="list" @scroll="loadMorePosts">
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  components: {
    postItem
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setIsLoadDataPosts: 'post/setIsLoadData'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts'
    }),
    loadMorePosts() {
      if (this.totalPages > this.page && !this.isLoadData) {
        const height = this.$refs.list.offsetHeight;
        const scrolled = this.$refs.list.scrollTop;
        const scrollHeight = this.$refs.list.scrollHeight;
        if (scrollHeight - scrolled <= height) {
          this.setPage(this.page + 1);
          this.fetchPosts();
          this.setIsLoadDataPosts(false);
        }
      }
    }
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      totalPages: state => state.post.totalPages,
      page: state => state.post.page,
      isLoadData: state => state.post.isLoadData
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
  overflow-y: auto;
  height: 70%;
}
.posts__list::-webkit-scrollbar {
  width: 20px;
}
.posts__list::-webkit-scrollbar-thumb {
  background-color: #181aa1;
  border-radius: 5px;
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

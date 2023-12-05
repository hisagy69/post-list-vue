<template>
  <div class="post" v-if="post.id">
    <my-button
      class="button-back post__button-back"
      @click="$router.go(-1)"
    >Назад</my-button>
    <div class="post__wrap" v-if="!isLoadPost && !isLoadUser">
      <my-title class="post__title">{{ post.title }}</my-title>
      <p class="post__text">{{ post.body }}</p>
      <div class="post__autor">
        <span class="post__username">Author: <strong>{{ user.username }}</strong></span>
        <span class="post__user-email">Email: <strong><a :href="user.email">{{ user.email }}</a></strong></span>
        <span class="post__user-site">website: <a :href="user.website">{{ user.website }}</a></span>
      </div>
      <comment-list/>
    </div>
    <div v-else class="posts__load">Загрузка поста...</div>
  </div>
  <not-found-page v-else></not-found-page>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import NotFoundPage from '@/pages/NotFoundPage';
import commentList from '@/components/commentList';

export default {
  components: {
    NotFoundPage,
    commentList
  },
  computed: mapState({
    post: state => state.post.post,
    isLoadPost: state => state.post.isLoadData,
    isLoadUser: state => state.user.isLoadData,
    user: state => state.user.user
  }),
  methods: {
    ...mapActions({
      fetchPost: 'post/fetchPost',
      fetchUser: 'user/fetchUser'
    }),
    ...mapMutations({
      setUser: 'user/setUser'
    })
  },
  mounted() {
    this.fetchPost(this.$route.params.id);
  },
  unmounted() {
    this.setUser({});
  },
  watch: {
    isLoadPost() {
      if (this.post?.userId) {
        this.fetchUser(this.post.userId);
      }
    }
  }
}
</script>

<style scoped>
.post__button-back {
  margin-top: 30px;
}
.post__text {
  margin-bottom: 70px;
}
.post__autor {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-left: auto;
  margin-bottom: 50px;
}
.post__username, .post__user-email {
  margin-bottom: 15px;
}
</style>

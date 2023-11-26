<template>
  <div class="post">
    <div class="post__wrap" v-if="!isLoadData">
      <my-title class="post__title">{{ post.title }}</my-title>
      <p class="post__text">{{ post.body }}</p>
    </div>
    <div v-else class="posts__load">Загрузка постов...</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoadData: false,
        post: {}
      }
    },
    methods: {
      fetchPost() {
        this.isLoadData = true;
        return fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
          .then(response => response.json())
          .then(json => {
            this.post = json;
            this.isLoadData = false;
            console.log(this.post)
          })
          .catch(e => console.error(e.message));
      },
    },
    mounted() {
      this.fetchPost();
    }
  }
</script>

<style scoped>

</style>

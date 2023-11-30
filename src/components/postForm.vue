<template>
  <form @submit.prevent class="form posts__form">
    <h4 class="form__title">Добавление поста</h4>
    <my-input v-model="post.title" class="form__input" placeholder="Название поста"/>
    <my-input v-model="post.body" class="form__input" placeholder="Текст поста"/>
    <my-button
      @click="createPost"
    >Отправить пост</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.$store.dispatch('post/createPost', this.post);
      this.$emit('update');
    }
  }
}
</script>

<style scoped>
.form__title {
  font-family: sans-serif;
  color: #181aa1;
  text-align: center;
  margin-bottom: 15px;
}
.form__input {
  width: 100%;
  margin-bottom: 15px;
}
</style>

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
        body: '',
        id: 0,
      }
    }
  },
  methods: {
    createPost() {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: this.title,
          body: this.body
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(json => {
          this.id = json.id;
          this.$emit('update', this.post);
        })
        .catch(e => console.error(e.message));
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

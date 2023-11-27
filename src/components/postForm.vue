<template>
  <form class="form posts__form">
    <h4 class="form__title">Добавление поста</h4>
    <my-input v-model="post.title"/>
    <my-input v-model="post.body"/>
    <my-button>Отправить пост</my-button>
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
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="page-404">
    <my-title>404 page not found</my-title>
    <my-button
      @click="$router.push('/')"
      class="page-404__button-back"
    >Вернуться на главную</my-button>
  </div>
</template>
<style scoped>
.page-404__button-back {
  display: block;
  margin: 0 auto;
}
</style>

<template>
  <div class="page-404">
    <h1 class="page-404__heading">404 page not found</h1>
    <button
      @click="$router.push('/')"
    >Вернуться на главную</button>
  </div>
</template>
<style scoped>
.page-404 {
  text-align: center;
}
.page-404__heading {
  font-size: 50px;
  margin-top: 50px;
}
</style>

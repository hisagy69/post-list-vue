<template>
  <h1 class="title"><slot></slot></h1>
</template>

<script>
export default {
  name: 'my-title'
}
</script>

<style scoped>
.title {
  font-size: 50px;
  color: #181aa1;
  font-family: sans-serif;
  margin: 50px 0;
  text-align: center;
}
</style>

<template>
  <div class="post__item">
    <p class="post__title">{{ title }}</p>
    <p class="post__text">{{ description }}</p>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.post__item {
  margin-bottom: 15px;
}
.post__item {
  border: 1px solid #181aa1;
  color: #181aa1;
  padding: 15px;
  border-radius: 5px;
  font-family: sans-serif;
}
.post__title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
}
</style>

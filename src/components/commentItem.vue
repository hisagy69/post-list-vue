<template>
  <div class="comment__item">
    <div class="comment__text">{{ body }}</div>
    <div class="comment__author">
      <span class="comment__name">{{ name }}</span>
      <span class="comment__email">{{ email }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.comment__item {
  border: 1px solid #181aa1;
  color: #181aa1;
  padding: 15px;
  border-radius: 5px;
  font-family: sans-serif;
  margin-bottom: 15px;
}
.comment__text {
  margin-bottom: 15px;
}
.comment__author {
  color: #000;
  font-style: italic;
  text-align: right;
}
</style>

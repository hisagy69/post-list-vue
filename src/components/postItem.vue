<template>
  <div class="post__item" @click="$router.push(`post/${id}`)">
    <p class="post__title">{{ title }}</p>
    <p class="post__text">{{ body }}</p>
    <p class="post__author">{{ user.username }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.post__item {
  border: 1px solid #181aa1;
  color: #181aa1;
  padding: 15px;
  border-radius: 5px;
  font-family: sans-serif;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
}
.post__item:hover {
  background-color: #181aa1;
  color: #fff;
}
.post__title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
}
.post__text {
  margin-bottom: 15px;
}
.post__author {
  color: #000;
  font-style: italic;
  text-align: right;
}
</style>

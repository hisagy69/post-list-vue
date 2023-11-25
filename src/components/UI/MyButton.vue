<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'my-button'
  };
</script>

<style scoped>
.button {
  padding: 15px;
  background-color: transparent;
  border-radius: 5px;
  color: #181aa1;
  border: 1px solid #181aa1;
  cursor: pointer;
  transition: all 0.3s;
}
.button:hover {
  background-color: #181aa1;
  color: #fff;
}
</style>

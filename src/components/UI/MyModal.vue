<template>
  <div class="modal" @click.stop="modalClose">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-modal',
  methods: {
    modalClose() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
}
.modal__content {
  background-color: #fff;
  width: 250px;
  padding: 20px;
  border-radius: 5px;
}
</style>

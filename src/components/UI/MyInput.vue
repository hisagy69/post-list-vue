<template>
  <input
    class="input"
    :value="modelValue"
    @input="updateInput"
  >
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: String
  },
  methods: {
    updateInput(e) {
      this.$emmit('update:modelValue', e.target.value);
    }
  }
}
</script>

<style scoped>
.input {
  padding: 5px;
}
</style>

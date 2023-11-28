<template>
  <input
    class="input"
    type="text"
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
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>

<style scoped>
.input {
  padding: 5px;
  border: 1px solid #181aa1;
}
.input:focus {
  background-color: #181aa16e;
}
</style>

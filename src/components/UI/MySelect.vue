<template>
  <select :value="modelValue" @change="changeOption" class="select">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style>
.select {
  padding: 15px;
  background-color: transparent;
  border-radius: 5px;
  color: #181aa1;
  border: 1px solid #181aa1;
  cursor: pointer;
  transition: all 0.3s;
}
.select:hover {
  background-color: #181aa1;
  color: #fff;
}
</style>

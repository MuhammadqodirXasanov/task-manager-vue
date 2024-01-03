<template>
  <input
    :type="type"
    class="form-control inp-handler"
    placeholder="Yangi vazifa qo'shish"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
  />
</template>
<script>
export default {
  name: "Input",
  props: {
    type: String,
    modelValue: [String, Number, Boolean],
  },
};
</script>
<style>
.inp-handler {
  padding: 10px;
  opacity: 70%;
  font-weight: 500;
  border: 3px solid #00000075;
}
</style>

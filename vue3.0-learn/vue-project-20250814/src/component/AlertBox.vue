<script setup>
const props = defineProps({
  foo: String,
});
const emits = defineEmits({
  //没有校验
  'click': null,
  //校验submit事件
  "my-submit": ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      console.warn("email and password are required");
      return false;
    }
  },
});

const model=defineModel()


console.log(props.foo);

function buttonClick(email,password) {
  emits("my-submit",{email,password});
}
</script>
<template>
  <div class="alert-box">
    <strong>This is an Error form Demo Purposes</strong>
    <button @click="buttonClick()">click me</button>
    <slot />
    <input v-model="model"/>
  </div>
</template>
<style scoped>
.alert-box {
  color: blue;
}
</style>

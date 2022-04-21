<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <button type="button" @click="addSize">Add Size</button>
  <p>{{size}}</p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

    <p>第{{year}}年</p>
    <p>姓名：{{nickname}}</p>
    <p>年龄：{{age}}</p>

</template>

<script lang="ts">
import { ref, reactive,defineComponent, toRef, toRefs } from 'vue'


export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count =ref(0)
    type Size='sm'|'md'|'lg'
    const size=ref<Size>('md')

    const addSize=() =>{
      size.value='lg'
    }

    ////////////
    const year=ref(0);
    const user=reactive({
      nickname:'xiaofan',
      age:26,
      gender:'女'
    });
    setInterval(() =>{
       year.value ++;
       user.age ++;
    },1000);

    //////////

    return { count,size ,addSize,year,...toRefs(user)}
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

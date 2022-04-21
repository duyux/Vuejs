<template>
  <p>count: {{count}}</p>
  <p>倍数：{{multiple}}</p>

  <div>
    <button @click="increase()">加1</button>
    <button @click="decrease()">减一</button>
  </div>

</template>

<script lang="ts">
import { ref, reactive,defineComponent, toRef, toRefs, watch } from 'vue'
import useCount from '../hooks/useCount';

export default defineComponent({
  name: 'TestVue',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const {count,multiple,increase,decrease}=useCount(10);
 
    return {
      count,
      multiple,
      increase,
      decrease
    };
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

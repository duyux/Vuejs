<template>
  <h1>{{ msg }}</h1>

   <h1>{{ countv3 }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <button @click="myFunc">单击</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import {ref} from 'vue';
import userAddClick from '../js/count.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  setup(){
    //  const countv3=ref(5);

    //  function myFunc(){
    //   // alert('123')
    //    countv3.value+=1;
    //  };

    const {countv3,myFunc}=userAddClick();

     return{countv3,myFunc};
  }


}

</script>

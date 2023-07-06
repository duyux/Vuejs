<template>
  <div>
    <div>
      <span>{{ store.userInfo.name }}</span> <br />
      <span>{{ store.userInfo.age }}</span> <br />
      <span>{{ store.userInfo.gender }}</span> <br />
      <span>{{ store.changeAge }}</span
      ><br />
      <button @click="store.update('李斯')">update</button>
      <button @click="store.asyncUpdate('女')">asyncUpdate</button>
    </div>

    <div class="home">
      <h2>Home View</h2>
      <h2>name:{{ counterStore.name }}</h2>
      <h2>age:{{ counterStore.age }}</h2>
      <h2>count:{{ counterStore.count }}</h2>
      <h2>double count:{{ counterStore.doubleCount }}</h2>
      <h2>full name:{{ counterStore.fullname }}</h2>
      <button @click="changeState">+1</button>
      <button @click="update">修改</button>
      <button @click="reset">重置</button> <br>

      <button @click="increment">increment</button>
      <button @click="random">random</button>
      <button @click="incrementBy">incrementBy</button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/modules/user';
import useCounter from '../stores/modules/counter';

const counterStore=useCounter()

const store = useUserStore();

const changeState=() =>{
  counterStore.count++;
}

const update=() =>{
  counterStore.$patch({
    name:'list',
    age:20
  })
}

const reset=() =>{
  counterStore.$reset();
}

const increment=() =>{
  counterStore.increment();
}

const random=() =>{
  counterStore.randomCount();
}

const incrementBy=() =>{
  counterStore.incrementByPayload(10);
}

//异步
counterStore.fetchData().then((res) =>{
  console.log(res);
})

</script>

<style scoped></style>

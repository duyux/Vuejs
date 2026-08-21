<template>
  <div>
   <div v-if="userStore.isLogin">
    欢迎：{{ userStore.userInfo?.name }}
    <button @click="userStore.logout">退出登录</button>
    </div>

    <button @click="handleLogin">登录</button>
  </div>
</template>

<scritp setup lang="ts">
    import {useUserStore} from '@/stores'
    import {storeToRefs} from 'pinia'

    const userStore = useUserStore()
    const {isLogin,userInfo} = storeToRefs(userStore)

    const handleLogin=async() =>{
        await userStore.login({username:'admin',password:'123456'})
        await userStore.fetchUserInfo()
    }

</scritp>
<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from './stores/app'

const appStore = useAppStore()
const { locale, dateLocale } = storeToRefs(appStore)
</script>

<style scoped></style>

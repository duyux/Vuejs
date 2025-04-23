<template>
  <div class="home-view">
    <h1>血型遗传计算器</h1>
    <BloodTypeCalculator />
  </div>
</template>

<script setup>
// import BloodTypeCalculator from '@/components/BloodTypeCalculator.vue'
import BloodTypeCalculator from '../components/BloodTypeCalculator.vue'
</script>

<style scoped>
.home-view {
  padding: 2rem;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 4rem);
}

@media (max-width: 768px) {
  .home-view {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .home-view {
    padding: 0.5rem;
  }
  h1 {
    font-size: 1.5rem;
  }
}

h1 {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  margin-bottom: 2rem;
  font-size: 2rem;
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
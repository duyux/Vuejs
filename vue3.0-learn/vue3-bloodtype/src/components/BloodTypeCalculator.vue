<template>
  <div class="calculator">
    <div class="input-group">
      <label>父亲血型：</label>
      <select v-model="fatherType" class="blood-select">
        <option v-for="type in bloodTypes" :key="type">{{ type }}</option>
      </select>
    </div>
    
    <div class="input-group">
      <label>母亲血型：</label>
      <select v-model="motherType" class="blood-select">
        <option v-for="type in bloodTypes" :key="type">{{ type }}</option>
      </select>
    </div>

    <div class="button-group">
      <button @click="calculate" :disabled="isCalculating" class="calculate-btn">
        {{ isCalculating ? '计算中...' : '查询' }}
      </button>
      <button @click="reset" class="reset-btn">
        重置
      </button>
    </div>

    <div v-if="showResult" class="result-box">
      <div class="loading-animation" v-if="isCalculating"></div>
      <div v-else class="result-display">
        <span class="blood-result">{{ result }}</span>
        <div class="genetic-info">可能的基因组合：{{ possibleGenes.join(' 或 ') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const bloodTypes = ['A', 'B', 'AB', 'O'];
const fatherType = ref('B');
const motherType = ref('B');
const isCalculating = ref(false);
const showResult = ref(false);

const possibleGenes = computed(() => {
  // 血型遗传算法逻辑
  const combinations = {
    'B+B': ['BB', 'BO'],
    'B+O': ['BO'],
    'O+B': ['BO'],
    'B+A': ['AB', 'BO'],
    'A+B': ['AB', 'BO']
  };
  return combinations[`${fatherType.value}+${motherType.value}`] || ['未知组合'];
});

const result = computed(() => {
  const genes = possibleGenes.value[0];
  return genes.length === 2 ? genes.split('').join('') : genes;
});

const calculate = async () => {
  showResult.value = true;
  isCalculating.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  isCalculating.value = false;
};

const reset = () => {
  fatherType.value = 'B';
  motherType.value = 'B';
  showResult.value = false;
};
</script>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 2rem auto;
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input-group {
  margin-bottom: 1.5rem;
}

.blood-select {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  margin-left: 10px;
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.calculate-btn {
  background: #4263eb;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.calculate-btn:disabled {
  background: #748ffc;
  cursor: not-allowed;
}

.calculate-btn:hover:not(:disabled) {
  background: #364fc7;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.reset-btn {
  background: #ff6b6b;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

@media (max-width: 480px) {
  .button-group {
    gap: 1rem;
    flex-direction: column;
  }
  
  .calculate-btn,
  .reset-btn {
    width: 100%;
    padding: 14px;
  }
}

.result-box {
  margin-top: 2rem;
  padding: 20px;
  background: white;
  border-radius: 8px;
  min-height: 100px;
}

.loading-animation {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4263eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.blood-result {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4263eb;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.genetic-info {
  margin-top: 1rem;
  color: #868e96;
  font-size: 0.9rem;
}
</style>
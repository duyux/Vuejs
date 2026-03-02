<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as XLSX from 'xlsx';

interface Participant {
  id: string;
  name: string;
  phone: string;
}

// 状态管理
const fileInput = ref<HTMLInputElement | null>(null);
const participants = ref<Participant[]>([]);
const winners = ref<Participant[]>([]);
const drawCount = ref<number>(1);
const isDrawing = ref<boolean>(false);
const drawResult = ref<Participant[]>([]);
const currentDisplayWinners = ref<Participant[]>([]);

// 上传Excel文件
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        throw new Error('Excel文件没有工作表');
      }
      const worksheet = workbook.Sheets[firstSheetName];
      if (!worksheet) {
        throw new Error('无法读取工作表内容');
      }
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // 处理Excel数据，假设列名为ID、姓名、手机号
      participants.value = jsonData.map((row: any) => ({
        id: String(row['ID'] || row['id'] || row['序号'] || row['编号'] || ''),
        name: String(row['姓名'] || row['name'] || row['Name'] || ''),
        phone: String(row['手机号'] || row['phone'] || row['Phone'] || row['联系电话'] || '')
      })).filter(p => p.id && p.name);

      winners.value = [];
      drawResult.value = [];
      currentDisplayWinners.value = [];
      alert(`成功导入 ${participants.value.length} 名参与者！`);
    } catch (error) {
      alert('文件解析失败，请检查Excel格式！');
      console.error('Excel解析错误:', error);
    }
  };
  reader.readAsArrayBuffer(file);
};

// 抽奖功能
const startDraw = () => {
  if (participants.value.length === 0) {
    alert('请先上传参与者数据！');
    return;
  }

  if (drawCount.value <= 0 || drawCount.value > participants.value.length) {
    alert('请输入有效的抽奖数量！');
    return;
  }

  isDrawing.value = true;
  currentDisplayWinners.value = [];

  // 过滤出未中奖的参与者
  const availableParticipants = participants.value.filter(
    p => !winners.value.some(w => w.id === p.id)
  );

  if (availableParticipants.length < drawCount.value) {
    alert(`剩余可选人数不足！当前剩余 ${availableParticipants.length} 人`);
    isDrawing.value = false;
    return;
  }

  // 模拟抽奖动画
  let currentIndex = 0;
  const interval = setInterval(() => {
    currentIndex = Math.floor(Math.random() * availableParticipants.length);
    const participant = availableParticipants[currentIndex];
    if (participant) {
      currentDisplayWinners.value = [participant];
    }
  }, 50);

  // 3秒后结束抽奖
  setTimeout(() => {
    clearInterval(interval);
    isDrawing.value = false;
    
    // 随机选择指定数量的获奖者
    const selectedWinners: Participant[] = [];
    const tempParticipants = [...availableParticipants];
    
    for (let i = 0; i < drawCount.value && tempParticipants.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempParticipants.length);
      const winner = tempParticipants[randomIndex];
      if (winner) {
        selectedWinners.push(winner);
        winners.value.push(winner);
      }
      tempParticipants.splice(randomIndex, 1);
    }
    
    currentDisplayWinners.value = selectedWinners;
    drawResult.value = [...drawResult.value, ...selectedWinners];
  }, 3000);
};

// 重置抽奖
const resetDraw = () => {
  if (confirm('确定要重置所有抽奖数据吗？')) {
    winners.value = [];
    drawResult.value = [];
    currentDisplayWinners.value = [];
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
};

// 获取已使用人数
const getUsedCount = () => {
  return new Set(winners.value.map(w => w.id)).size;
};

// 组件挂载时设置默认抽奖数量
onMounted(() => {
  drawCount.value = 1;
});
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>抽奖系统</h1>
    </header>

    <main class="main-content">
      <!-- 控制面板 -->
      <section class="control-panel">
        <div class="upload-section">
          <input
            ref="fileInput"
            type="file"
            accept=".xlsx,.xls"
            @change="handleFileUpload"
            class="file-input"
          />
          <button @click="fileInput?.click()" class="upload-btn">
            上传Excel文件
          </button>
          <span class="info-text">
            {{ participants.length }} 人已导入 | 已抽取 {{ getUsedCount() }} 人
          </span>
        </div>

        <div class="draw-control">
          <div class="input-group">
            <label for="drawCount">抽奖数量：</label>
            <input
              id="drawCount"
              v-model.number="drawCount"
              type="number"
              min="1"
              :max="participants.length - getUsedCount()"
              class="count-input"
            />
          </div>
          <button
            @click="startDraw"
            class="draw-btn"
            :disabled="isDrawing || participants.length === 0"
          >
            {{ isDrawing ? '抽奖中...' : '开始抽奖' }}
          </button>
          <button @click="resetDraw" class="reset-btn">重置抽奖</button>
        </div>
      </section>

      <!-- 抽奖结果展示 -->
      <section class="result-section">
        <h2 class="result-title">抽奖结果</h2>
        <div class="winners-container">
          <transition-group name="winner" tag="div" class="winners-list">
            <div
              v-for="(winner, index) in currentDisplayWinners"
              :key="`${winner.id}-${index}`"
              class="winner-card"
            >
              <div class="winner-name">{{ winner.name }}</div>
              <div class="winner-info">
                <span>ID: {{ winner.id }}</span>
                <span>手机: {{ winner.phone }}</span>
              </div>
            </div>
          </transition-group>
          <div v-if="currentDisplayWinners.length === 0 && !isDrawing" class="no-result">
            请点击抽奖按钮开始抽奖
          </div>
        </div>
      </section>

      <!-- 历史中奖记录 -->
      <section v-if="drawResult.length > 0" class="history-section">
        <h2 class="history-title">中奖记录</h2>
        <div class="history-list">
          <div
            v-for="(winner, index) in drawResult"
            :key="`${winner.id}-history-${index}`"
            class="history-item"
          >
            <span class="history-name">{{ winner.name }}</span>
            <span class="history-info">{{ winner.id }} | {{ winner.phone }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.main-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

/* 控制面板样式 */
.control-panel {
  margin-bottom: 40px;
}

.upload-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.file-input {
  display: none;
}

.upload-btn {
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.info-text {
  color: #666;
  font-size: 0.9rem;
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 20px;
}

.draw-control {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-group label {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
}

.count-input {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 100px;
  transition: border-color 0.3s ease;
}

.count-input:focus {
  outline: none;
  border-color: #667eea;
}

.draw-btn {
  background: linear-gradient(45deg, #FF5722, #F44336);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.draw-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 87, 34, 0.4);
}

.draw-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.reset-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #d32f2f;
  transform: translateY(-1px);
}

/* 结果展示样式 */
.result-section {
  margin-bottom: 40px;
}

.result-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.winners-container {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.winners-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.winner-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.winner-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.winner-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.no-result {
  font-size: 1.2rem;
  color: #999;
  text-align: center;
  padding: 40px;
}

/* 历史记录样式 */
.history-section {
  margin-top: 40px;
}

.history-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.history-item {
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  min-width: 250px;
  border: 1px solid #e9ecef;
}

.history-name {
  font-weight: 500;
  color: #333;
}

.history-info {
  color: #666;
  font-size: 0.85rem;
}

/* 抽奖动画 */
.winner-enter-active,
.winner-leave-active {
  transition: all 0.3s ease;
}

.winner-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.winner-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .main-content {
    padding: 20px;
  }
  
  .draw-control {
    flex-direction: column;
    align-items: stretch;
  }
  
  .input-group {
    justify-content: center;
  }
  
  .winner-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>

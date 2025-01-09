<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="app">
    <div class="banner">
      <img 
        src="https://picsum.photos/1280/200" 
        alt="横幅图片"
        class="banner-image"
      />
      <div class="banner-content">
        <h1 class="site-title">管理系统</h1>
      </div>
    </div>

    <main class="main-container">
      <div class="left-content">
        <div class="content-card table-container">
          <h2 class="section-title">数据列表</h2>
          <table class="data-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>城市</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.city }}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="pagination">
            <button 
              :disabled="currentPage === 1" 
              @click="currentPage--"
              class="page-btn"
            >
              上一页
            </button>
            <span class="page-info">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            <button 
              :disabled="currentPage === totalPages" 
              @click="currentPage++"
              class="page-btn"
            >
              下一页
            </button>
          </div>
        </div>
        
        <div class="content-card image-container">
          <h2 class="section-title">图片展示</h2>
          <img 
            src="https://picsum.photos/800/400" 
            alt="示例图片"
            class="bottom-image"
          />
        </div>
      </div>
      
      <div class="right-content">
        <div class="content-card calendar-container">
          <h2 class="section-title">日历</h2>
          <div class="calendar">
            <div class="calendar-header">
              <button class="month-btn" @click="changeMonth(-1)">◀</button>
              <h3>{{ currentYear }}年{{ currentMonth + 1 }}月</h3>
              <button class="month-btn" @click="changeMonth(1)">▶</button>
            </div>
            
            <div class="weekdays">
              <span v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day">
                {{ day }}
              </span>
            </div>
            
            <div class="days">
              <div 
                v-for="day in calendarDays" 
                :key="day.date"
                class="day-cell"
                :class="{ 'current-month': day.currentMonth, 'today': day.isToday }"
              >
                <span class="solar-day">{{ day.date }}</span>
                <span class="lunar-day">{{ day.lunar }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Lunar from 'lunar-javascript'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      allData: [
        { name: '张三', age: 25, city: '北京' },
        { name: '李四', age: 30, city: '上海' },
        { name: '王五', age: 28, city: '广州' },
        { name: '赵六', age: 35, city: '深圳' },
        { name: '钱七', age: 22, city: '杭州' },
      ],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
    }
  },
  computed: {
    tableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.allData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.allData.length / this.pageSize);
    },
    calendarDays() {
      const days = [];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
      const today = new Date();
      
      // 填充上个月的日期
      const firstDayWeek = firstDay.getDay();
      for (let i = firstDayWeek - 1; i >= 0; i--) {
        const date = new Date(firstDay);
        date.setDate(date.getDate() - i - 1);
        days.push({
          date: date.getDate(),
          currentMonth: false,
          isToday: false,
          lunar: this.getLunarDate(date)
        });
      }
      
      // 当前月的日期
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentMonth, i);
        days.push({
          date: i,
          currentMonth: true,
          isToday: this.isToday(date),
          lunar: this.getLunarDate(date)
        });
      }
      
      // 填充下个月的日期
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(lastDay);
        date.setDate(date.getDate() + i);
        days.push({
          date: i,
          currentMonth: false,
          isToday: false,
          lunar: this.getLunarDate(date)
        });
      }
      
      return days;
    }
  },
  methods: {
    changeMonth(delta) {
      const newDate = new Date(this.currentYear, this.currentMonth + delta, 1);
      this.currentYear = newDate.getFullYear();
      this.currentMonth = newDate.getMonth();
    },
    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    },
    getLunarDate(date) {
      const lunar = Lunar.Solar.fromDate(date).getLunar()
      return lunar.getDay() === 1 ? lunar.getMonthInChinese() + '月' : lunar.getDayInChinese()
    }
  }
}
</script>

<style scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 0 2rem 2rem;
}

.banner {
  position: relative;
  width: calc(100% + 4rem);
  margin: 0 -2rem 2rem;
  height: 200px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.banner-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
}

.site-title {
  color: white;
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 500;
}

.main-container {
  display: flex;
  gap: 2rem;
}

.left-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-content {
  width: 340px;
}

.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.table-container {
  padding: 1.5rem;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.data-table th {
  background-color: #f8fafc;
  padding: 1rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: left;
  border-bottom: 2px solid #edf2f7;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background-color: #f8fafc;
}

.pagination {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #edf2f7;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #cbd5e0;
}

.page-info {
  color: #4a5568;
  font-weight: 500;
}

.image-container {
  margin-top: 0;
}

.bottom-image {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.bottom-image:hover {
  transform: scale(1.02);
}

.calendar-container {
  height: fit-content;
}

.calendar {
  width: 100%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.calendar-header h3 {
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5rem;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 6px;
  border: 1px solid #edf2f7;
  transition: all 0.2s;
  cursor: pointer;
}

.day-cell:not(.current-month) {
  opacity: 0.5;
}

.day-cell:hover {
  background-color: #f8fafc;
}

.day-cell.today {
  background-color: #ebf8ff;
  border-color: #90cdf4;
}

.solar-day {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
  line-height: 1.2;
}

.lunar-day {
  font-size: 0.7rem;
  color: #718096;
  line-height: 1.2;
}

.month-btn {
  border: none;
  background: none;
  color: #4a5568;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.month-btn:hover {
  background-color: #f8fafc;
}

@media (max-width: 1024px) {
  .main-container {
    flex-direction: column;
  }
  
  .right-content {
    width: 100%;
  }
  
  .app {
    padding: 0 1rem 1rem;
  }
  
  .banner {
    width: calc(100% + 2rem);
    margin: 0 -1rem 2rem;
  }
  
  .site-title {
    font-size: 1.5rem;
  }
  
  .calendar-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .day-cell {
    padding: 0.5rem;
  }
  
  .solar-day {
    font-size: 1rem;
  }
  
  .lunar-day {
    font-size: 0.75rem;
  }
  
  .banner-content {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .solar-day {
    font-size: 0.8rem;
  }
  
  .lunar-day {
    font-size: 0.6rem;
  }
  
  .day-cell {
    padding: 0.2rem;
  }
  
  .banner {
    height: 150px;
  }
  
  .site-title {
    font-size: 1.2rem;
  }
  
  .banner-content {
    padding: 0.75rem 1rem;
  }
}
</style>

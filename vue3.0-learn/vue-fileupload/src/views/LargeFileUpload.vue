<template>
  <div style="padding: 30px; max-width: 1000px; margin: 0 auto">
    <h3>Vue大文件上传（企业级完整版）</h3>
    
    <!-- 文件选择（支持多文件） -->
    <div style="margin: 20px 0">
      <input
        type="file"
        @change="handleFileChange"
        multiple
        :disabled="isAllUploading"
      />
      <span style="margin-left: 10px; font-size: 14px; color: #666">
        支持多文件上传，单个文件建议不超过10GB
      </span>
    </div>
    
    <!-- 上传队列管理 -->
    <div v-if="uploadQueue.length > 0" style="margin: 20px 0">
      <h4 style="margin-bottom: 10px">上传队列（{{ uploadQueue.length }}个文件）</h4>
      <div 
        v-for="(item, index) in uploadQueue" 
        :key="item.fileHash"
        style="border: 1px solid #eee; padding: 15px; border-radius: 4px; margin-bottom: 10px"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
          <div>
            <span>文件：{{ item.file.name }}</span>
            <span style="margin-left: 10px; color: #666">
              大小：{{ (item.file.size / 1024 / 1024).toFixed(2) }} MB
            </span>
          </div>
          <div>
            <!-- 队列操作：删除 -->
            <button 
              @click="removeFromQueue(index)"
              :disabled="item.uploading"
              style="margin-right: 10px; color: #f44336; border: none; background: transparent; cursor: pointer"
            >
              删除
            </button>
            <!-- 上传操作：暂停/继续/取消 -->
            <button 
              @click="handleItemPauseResume(item)"
              :disabled="item.isCompleted || item.isCanceled"
              style="margin-right: 10px; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer"
              :style="{ background: item.paused ? '#2196f3' : '#f5a623', color: '#fff' }"
            >
              {{ item.paused ? '继续' : '暂停' }}
            </button>
            <button 
              @click="handleItemCancel(item)"
              :disabled="item.isCompleted || item.isCanceled"
              style="border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; background: #f44336; color: #fff"
            >
              取消
            </button>
        </div>
        </div>
        
        <!-- 单个文件进度条 -->
        <div v-if="item.totalProgress > 0 || item.uploading || item.paused">
          <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px">
            <span>进度：{{ item.totalProgress.toFixed(2) }}%</span>
            <span>状态：{{ getStatusText(item) }}</span>
          </div>
          <div style="height: 8px; background: #eee; border-radius: 4px">
            <div
              style="height: 100%; background: #42b983; border-radius: 4px; transition: width 0.3s ease"
              :style="{ width: `${item.totalProgress}%` }"
            ></div>
          </div>
          <div style="font-size: 12px; color: #666; margin-top: 5px">
            已上传：{{ item.uploadedChunkCount }}/{{ item.totalChunkCount }} 个分片
          </div>
        </div>;
        
        <!-- 提示信息 -->
        <div 
          v-if="item.message" 
          style="margin-top: 10px; padding: 6px; border-radius: 4px; font-size: 12px"
          :style="{ background: item.isSuccess ? '#e8f5e9' : '#ffebee', color: item.isSuccess ? '#2e7d32' : '#c62828' }"
        >
          {{ item.message }}
        </div>
      </div>
    </div>
    
    <!-- 批量操作按钮 -->
    <div v-if="uploadQueue.length > 0" style="margin: 10px 0">
      <button 
        @click="handleStartAll"
        :disabled="isAllUploading || isAllCompleted || isAllCanceled"
        style="margin-right: 10px; border: none; padding: 6px 12px; border-radius: 4px; background: #42b983; color: #fff; cursor: pointer"
      >
        开始所有上传
      </button>
      <button 
        @click="handlePauseAll"
        :disabled="!hasUploading || isAllPaused"
        style="margin-right: 10px; border: none; padding: 6px 12px; border-radius: 4px; background: #f5a623; color: #fff; cursor: pointer"
      >
        暂停所有上传
      </button>
      <button 
        @click="handleResumeAll"
        :disabled="!hasPaused"
        style="margin-right: 10px; border: none; padding: 6px 12px; border-radius: 4px; background: #2196f3; color: #fff; cursor: pointer"
      >
        继续所有上传
      </button>
      <button 
        @click="handleCancelAll"
        :disabled="isAllCompleted || isAllCanceled"
        style="border: none; padding: 6px 12px; border-radius: 4px; background: #f44336; color: #fff; cursor: pointer"
      >
        取消所有上传
      </button>
    </div>
    
   <!-- 空队列提示 -->
    <div v-if="uploadQueue.length === 0" style="padding: 20px; text-align: center; color: #666">
      暂无上传文件，请选择文件添加到队列
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import {
  createFileChunk,
  calculateFileHash,
  checkFile,
  uploadSingleChunk,
  mergeChunks,
  cancelUpload,
  UPLOAD_CONFIG
} from '@/utils/upload';

// 上传队列（多文件管理核心）
const uploadQueue = ref([]);

// 队列状态计算（批量操作使用）
const isAllUploading = computed(() => uploadQueue.value.every(item => item.uploading));
const isAllCompleted = computed(() => uploadQueue.value.every(item => item.isCompleted));
const isAllCanceled = computed(() => uploadQueue.value.every(item => item.isCanceled));
const isAllPaused = computed(() => uploadQueue.value.every(item => item.paused && !item.isCompleted && !item.isCanceled));
const hasUploading = computed(() => uploadQueue.value.some(item => item.uploading));
const hasPaused = computed(() => uploadQueue.value.some(item => item.paused && !item.isCompleted && !item.isCanceled));

// 选择多文件，添加到上传队列
const handleFileChange = async (e) => {
  const selectedFiles = e.target.files;
  if (!selectedFiles || selectedFiles.length === 0) return;

  // 遍历选中的文件，添加到队列（去重：相同文件哈希不重复添加）
  for (const file of selectedFiles) {
    // 先切割分片，计算哈希（用于去重和后续上传）
    const chunks = createFileChunk(file);
    const fileHash = await calculateFileHash(file, chunks);

    // 去重：判断队列中是否已存在该文件（通过哈希值）
    const isExistInQueue = uploadQueue.value.some(item => item.fileHash === fileHash);
    if (isExistInQueue) {
      alert(`文件${file.name}已在上传队列中，无需重复添加`);
      continue;
    }

    // 添加到上传队列，初始化状态
    uploadQueue.value.push({
      file,
      fileHash,
      chunks,
      totalChunkCount: chunks.length,
      uploadedChunkCount: 0,
      totalProgress: 0,
      uploading: false,
      paused: false,
      isCompleted: false,
      isCanceled: false,
      message: '',
      isSuccess: false,
      isError: false
    });
  }

  // 清空input值，避免重复选择同一文件
  e.target.value = '';
};

// 获取文件状态文本
const getStatusText = (item) => {
  if (item.isCompleted) return '上传完成';
  if (item.isCanceled) return '已取消';
  if (item.uploading) return '上传中';
  if (item.paused) return '已暂停';
  return '待上传';
};

// 单个文件：开始/继续上传（核心方法，支持断点续传）
const handleItemUpload = async (item) => {
  if (item.uploading || item.isCompleted || item.isCanceled) return;

  try {
    item.uploading = true;
    item.paused = false;
    item.message = '准备上传（校验文件+计算哈希）...';

    // 1. 校验文件（秒传、断点续传）
    const checkResult = await checkFile(item.fileHash, item.file.name);
    if (checkResult.isExist) {
      // 秒传：文件已存在，直接标记完成
      item.message = '文件已存在，秒传成功！';
      item.isSuccess = true;
      item.isCompleted = true;
      item.totalProgress = 100;
      item.uploading = false;
      return;
    }

    // 2. 过滤已上传分片（断点续传：刷新页面/断网后恢复）
    const unUploadedChunks = item.chunks.filter(
      (chunk) => !checkResult.uploadedChunks.includes(chunk.index)
    );
    item.uploadedChunkCount = item.chunks.length - unUploadedChunks.length;
    item.totalProgress = (item.uploadedChunkCount / item.totalChunkCount) * 100;

    // 3. 所有分片已上传，直接合并
    if (unUploadedChunks.length === 0) {
      await mergeChunks(item.fileHash, item.file.name);
      item.message = '所有分片已上传，合并完成！';
      item.isSuccess = true;
      item.isCompleted = true;
      item.totalProgress = 100;
      item.uploading = false;
      return;
    }

    // 4. 并发上传未完成的分片（带失败自动重试）
    item.message = '开始上传分片...';
    await uploadChunksConcurrently(unUploadedChunks, item);

    // 5. 合并分片
    item.message = '分片上传完成，正在合并文件...';
    await mergeChunks(item.fileHash, item.file.name);

    // 上传成功
    item.message = '文件上传成功！';
    item.isSuccess = true;
    item.isCompleted = true;
    item.totalProgress = 100;
  } catch (err) {
    item.message = `上传失败：${err.message}`;
    item.isError = true;
    item.paused = true; // 失败后自动暂停，方便用户重试
  } finally {
    item.uploading = false;
  }
};

// 并发上传分片（控制并发数量，监听进度）
const uploadChunksConcurrently = async (unUploadedChunks, item) => {
  // 给分片添加总分片数，用于上传接口
  const chunksWithMeta = unUploadedChunks.map(chunk => ({
    ...chunk,
    total: item.totalChunkCount
  }));

  // 监听分片进度，更新文件总进度
  watch(
    () => chunksWithMeta.map(chunk => chunk.progress),
    () => {
      const totalLoaded = chunksWithMeta.reduce((sum, chunk) => sum + chunk.progress, 0);
      item.totalProgress = (item.uploadedChunkCount / item.totalChunkCount) * 100 + (totalLoaded / item.totalChunkCount / 100);
    },
    { deep: true }
  );

  // 并发控制：每次最多上传UPLOAD_CONFIG.concurrency个分片
  for (let i = 0; i < chunksWithMeta.length; i += UPLOAD_CONFIG.concurrency) {
    // 暂停状态时，等待继续上传
    if (item.paused) {
      await new Promise(resolve => {
        const watcher = watch(() => item.paused, (newVal) => {
          if (!newVal) {
            watcher(); // 取消监听
            resolve();
          }
        });
      });
    }

    // 取消上传时，终止当前批量上传
    if (item.isCanceled) break;

    const batch = chunksWithMeta.slice(i, i + UPLOAD_CONFIG.concurrency);
    await Promise.all(batch.map(chunk => uploadSingleChunk(chunk, item.fileHash)));
    item.uploadedChunkCount += batch.length;
  }
};

// 单个文件：暂停/继续上传
const handleItemPauseResume = (item) => {
  if (item.uploading) {
    // 暂停上传
    item.paused = true;
    item.uploading = false;
    item.message = '上传已暂停，点击继续可恢复';
  } else if (item.paused && !item.isCompleted && !item.isCanceled) {
    // 继续上传
    handleItemUpload(item);
  }
};

// 单个文件：取消上传
const handleItemCancel = async (item) => {
  if (item.isCompleted || item.isCanceled) return;

  // 取消后端临时分片
  await cancelUpload(item.fileHash);

  // 更新文件状态
  item.isCanceled = true;
  item.uploading = false;
  item.paused = false;
  item.message = '已取消上传';
  item.isError = true;
};

// 从队列中删除文件
const removeFromQueue = (index) => {
  const item = uploadQueue.value[index];
  if (item.uploading) {
    alert('当前文件正在上传，无法删除，请先暂停或取消上传');
    return;
  }
  uploadQueue.value.splice(index, 1);
};

// 批量操作：开始所有文件上传
const handleStartAll = () => {
  uploadQueue.value.forEach(item => {
    if (!item.uploading && !item.isCompleted && !item.isCanceled && !item.paused) {
      handleItemUpload(item);
    }
  });
};

// 批量操作：暂停所有文件上传
const handlePauseAll = () => {
  uploadQueue.value.forEach(item => {
    if (item.uploading) {
      item.paused = true;
      item.uploading = false;
      item.message = '上传已暂停，点击继续可恢复';
    }
  });
};

// 批量操作：继续所有文件上传
const handleResumeAll = () => {
  uploadQueue.value.forEach(item => {
    if (item.paused && !item.isCompleted && !item.isCanceled) {
      handleItemUpload(item);
    }
  });
};

// 批量操作：取消所有文件上传
const handleCancelAll = async () => {
  for (const item of uploadQueue.value) {
    if (!item.isCompleted && !item.isCanceled) {
      await cancelUpload(item.fileHash);
      item.isCanceled = true;
      item.uploading = false;
      item.paused = false;
      item.message = '已取消上传';
      item.isError = true;
    }
  }
};

// 页面刷新时，恢复未完成的上传（断点续传核心：刷新页面不丢失进度）
const restoreUploadProgress = async () => {
  // 这里可根据实际需求，从localStorage读取未完成的文件信息（示例逻辑）
  const savedQueue = localStorage.getItem('uploadQueue');
  if (!savedQueue) return;

  const parsedQueue = JSON.parse(savedQueue);
  for (const savedItem of parsedQueue) {
    if (savedItem.isCompleted || savedItem.isCanceled) continue;

    // 重新读取文件（注：浏览器无法直接从哈希恢复文件，需用户重新选择，此处为示例）
    // 实际企业级场景可结合后端存储，通过哈希重新获取文件信息
    alert(`检测到未完成的上传：${savedItem.file.name}，请重新选择该文件以恢复进度`);
  }
};

// 监听队列变化，保存到localStorage（刷新页面恢复进度）
watch(
  () => uploadQueue.value,
  (newQueue) => {
    // 只保存未完成、未取消的文件信息
    const savedQueue = newQueue.filter(item => !item.isCompleted && !item.isCanceled).map(item => ({
      fileHash: item.fileHash,
      file: { name: item.file.name, size: item.file.size },
      totalChunkCount: item.totalChunkCount,
      uploadedChunkCount: item.uploadedChunkCount,
      totalProgress: item.totalProgress,
      isCompleted: item.isCompleted,
      isCanceled: item.isCanceled
    }));
    localStorage.setItem('uploadQueue', JSON.stringify(savedQueue));
  },
  { deep: true }
);

// 页面初始化时，恢复未完成的上传
restoreUploadProgress();
</script>

<template>
  <div class="container">
    <header>
      <h1>📄 Vue 3 与 OnlyOffice 集成</h1>
      <p>状态: <span :class="statusClass">{{ status }}</span></p>
    </header>

    <main>
      <!-- 编辑器挂载点 -->
      <div id="editor-container" v-show="status === '加载成功'"></div>
      
      <!-- 加载指示器 -->
      <div v-if="status !== '加载成功'" class="loading">
        {{ status }}
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      status: '初始化中...',
      editor: null
    }
  },
  mounted() {
    this.loadOnlyOfficeSDK();
  },
  methods: {
    /**
     * 动态加载 OnlyOffice Web SDK 脚本
     */
    loadOnlyOfficeSDK() {
      // 1. 检查是否已加载
      if (window.DocsAPI) {
        this.initEditor();
        return;
      }

      // 2. 创建 script 标签
      const script = document.createElement('script');
      // 使用官方演示服务器的 SDK (生产环境请替换为你的服务器地址)
      script.src = 'https://site.docs.onlyoffice.com/web-apps/apps/api/documents/api.js?preload=placeholder'; 
      script.async = true;
      script.onload = () => {
        this.status = 'SDK 加载成功，正在初始化编辑器...';
        this.initEditor();
      };
      script.onerror = () => {
        this.status = 'SDK 加载失败，请检查网络连接';
        console.error('OnlyOffice SDK 加载失败');
      };

      document.head.appendChild(script);
    },

    /**
     * 初始化文档编辑器
     */
    initEditor() {
      const config = {
        // 文档配置
        "document": {
          "title": "Sample Document.docx",
          // 使用官方演示文档作为示例
          "url": "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx",
          "fileType": "docx",
          "key": "vue_demo_sample_001" // 文档版本键，用于缓存控制
        },
        // 编辑器配置
        "editorConfig": {
          "mode": "view", // "view" 或 "edit"
          "lang": "zh-CN",
          "callbackUrl": "https://your-server.com/callback" // 保存回调地址 (模拟)
        },
        // 事件回调
        "events": {
          'onDocumentStateChange': (event) => {
            console.log('文档状态改变:', event);
            document.title = event.data ? '已修改' : 'OnlyOffice Demo';
          },
          'onError': (error) => {
            this.status = `编辑器错误: ${error}`;
            console.error('OnlyOffice Error:', error);
          },
          'onDocumentReady': () => {
            console.log('文档已准备就绪');
            this.status = '加载成功';
          }
        },
        "height": "600px",
        "width": "100%"
      };

      try {
        // 确保容器存在
        const container = document.getElementById('editor-container');
        if (!container) {
          this.status = '编辑器容器未找到';
          return;
        }

        // 初始化编辑器实例
        // 注意：'editor' 是挂载点的 ID
        this.editor = new window.DocsAPI.DocEditor("editor-container", config);
      } catch (err) {
        this.status = '编辑器初始化异常';
        console.error('初始化失败:', err);
      }
    }
  },
  beforeUnmount() {
    // 组件销毁前销毁编辑器实例（如果支持）
    if (this.editor && this.editor.destroy) {
      this.editor.destroy();
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

header {
  background: #42b983;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  margin-bottom: 10px;
}

.status-success {
  color: #42b983;
  font-weight: bold;
}

.status-error {
  color: #e53935;
  font-weight: bold;
}

main {
  padding: 30px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#editor-container {
  width: 100%;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 20px 0;
}

.loading {
  color: #666;
  font-style: italic;
  padding: 40px;
}
</style>
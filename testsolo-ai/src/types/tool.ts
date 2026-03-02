// 工具类型定义
export interface Tool {
  id: string;                // 工具唯一标识符
  name: string;              // 工具名称（必填）
  description: string;       // 工具简介（必填）
  type: string;              // 工具类型（必填）
  image?: string;            // 工具图片（可选）
  tutorialUrl?: string;      // 工具教程链接（可选）
  websiteUrl?: string;       // 工具网址（可选）
  addDate: string;           // 添加日期（必填）
  updateDate: string;        // 更新日期（必填）
}

// 工具表单数据类型
export interface ToolFormData {
  name: string;
  description: string;
  type: string;
  image?: string;
  tutorialUrl?: string;
  websiteUrl?: string;
}
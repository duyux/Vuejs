import type { Tool } from '../types/tool';

// 模拟工具数据
export const mockTools: Tool[] = [
  {
    id: '1',
    name: '代码生成助手',
    description: '智能生成代码，提高开发效率',
    type: '开发工具',
    image: 'https://via.placeholder.com/150',
    tutorialUrl: 'https://example.com/tutorial1',
    websiteUrl: 'https://example.com/tool1',
    addDate: '2024-01-01',
    updateDate: '2024-01-15'
  },
  {
    id: '2',
    name: '文档自动生成器',
    description: '根据代码自动生成API文档',
    type: '文档工具',
    tutorialUrl: 'https://example.com/tutorial2',
    addDate: '2024-01-05',
    updateDate: '2024-01-20'
  },
  {
    id: '3',
    name: '项目管理看板',
    description: '可视化管理项目进度和任务',
    type: '管理工具',
    image: 'https://via.placeholder.com/150',
    websiteUrl: 'https://example.com/tool3',
    addDate: '2024-01-10',
    updateDate: '2024-01-25'
  },
  {
    id: '4',
    name: '性能分析工具',
    description: '分析应用性能，找出瓶颈',
    type: '开发工具',
    addDate: '2024-01-12',
    updateDate: '2024-01-28'
  }
];

// 模拟工具类型列表
export const toolTypes: string[] = [
  '开发工具',
  '文档工具',
  '管理工具',
  '设计工具',
  '测试工具',
  '部署工具'
];
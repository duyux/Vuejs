import type { Tool, ToolFormData } from '../types/tool';
import { mockTools } from '../data/mockData';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 获取所有工具
export const getTools = async (): Promise<Tool[]> => {
  await delay(500); // 模拟网络延迟
  return [...mockTools];
};

// 根据ID获取工具
export const getToolById = async (id: string): Promise<Tool | undefined> => {
  await delay(300);
  return mockTools.find(tool => tool.id === id);
};

// 添加新工具
export const addTool = async (toolData: ToolFormData): Promise<Tool> => {
  await delay(500);
  const newTool: Tool = {
    id: Date.now().toString(),
    ...toolData,
    addDate: new Date().toISOString().split('T')[0],
    updateDate: new Date().toISOString().split('T')[0]
  };
  mockTools.push(newTool);
  return newTool;
};

// 更新工具
export const updateTool = async (id: string, toolData: ToolFormData): Promise<Tool | null> => {
  await delay(500);
  const index = mockTools.findIndex(tool => tool.id === id);
  if (index === -1) return null;
  
  const updatedTool: Tool = {
    ...mockTools[index],
    ...toolData,
    updateDate: new Date().toISOString().split('T')[0]
  };
  
  mockTools[index] = updatedTool;
  return updatedTool;
};

// 删除工具
export const deleteTool = async (id: string): Promise<boolean> => {
  await delay(300);
  const index = mockTools.findIndex(tool => tool.id === id);
  if (index === -1) return false;
  
  mockTools.splice(index, 1);
  return true;
};

// 根据类型筛选工具
export const getToolsByType = async (type: string): Promise<Tool[]> => {
  await delay(300);
  return mockTools.filter(tool => tool.type === type);
};
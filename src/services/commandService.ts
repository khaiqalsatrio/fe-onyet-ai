import axios from 'axios';
import { API_URL } from '../config/api';

export interface RequestLog {
  id: string;
  prompt: string;
  result: string;
  modelUsed: string;
  tokensUsed?: number;
  createdAt: string;
}

export const commandService = {
  generateCommand: async (prompt: string): Promise<RequestLog> => {
    const response = await axios.post<RequestLog>(`${API_URL}/commands/generate`, { prompt });
    return response.data;
  },

  getHistory: async (): Promise<RequestLog[]> => {
    const response = await axios.get<RequestLog[]>(`${API_URL}/commands/history`);
    return response.data;
  },

  getHistoryDetail: async (id: string): Promise<RequestLog> => {
    const response = await axios.get<RequestLog>(`${API_URL}/commands/history/${id}`);
    return response.data;
  },

  deleteHistory: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/commands/history/${id}`);
  }
};

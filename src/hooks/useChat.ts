import { useState, FormEvent } from 'react';
import { commandService } from '../services/commandService';
import axios from 'axios';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

export const useChat = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const generateCommand = async (e?: FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    const userPrompt = prompt.trim();
    const newUserMsg: ChatMessage = { id: Date.now().toString() + '-user', role: 'user', content: userPrompt };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const data = await commandService.generateCommand(userPrompt);
      const newBotMsg: ChatMessage = {
        id: data.id || Date.now().toString() + '-bot',
        role: 'assistant',
        content: data.result,
      };
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      console.error('Error generating command:', err);
      let errorMessage = 'Terjadi kesalahan saat menghubungi server.';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setMessages((prev) => [...prev, {
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: errorMessage,
        isError: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    loading,
    messages,
    generateCommand,
  };
};

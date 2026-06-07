import { useState, useEffect } from 'react';
import { commandService, RequestLog } from '../services/commandService';

export const useHistory = () => {
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await commandService.getHistory();
      setLogs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load history logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    logs,
    loading,
    error,
    refetch: fetchHistory
  };
};

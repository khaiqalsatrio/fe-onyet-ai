import { useState, useEffect } from 'react';
import { commandService, RequestLog } from '../services/commandService';

export const useHistoryDetail = (id: string | null, onBack?: (view: string) => void) => {
  const [log, setLog] = useState<RequestLog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await commandService.getHistoryDetail(id);
        setLog(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching detail:', err);
        setError('Failed to load detail.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      setDeleting(true);
      await commandService.deleteHistory(id);
      if (onBack) onBack('history');
    } catch (err) {
      console.error('Error deleting log:', err);
      alert('Failed to delete log.');
      setDeleting(false);
    }
  };

  const handleCopy = () => {
    if (log?.result) {
      navigator.clipboard.writeText(log.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    log,
    loading,
    error,
    deleting,
    copied,
    handleDelete,
    handleCopy
  };
};

// src/services/fetchCandidates.ts

export const fetchCandidates = async () => {
    try {
      const response = await fetch('/api/candidates');
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  };
  
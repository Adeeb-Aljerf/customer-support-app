const API_BASE_URL = 'https://openapi.pythonanywhere.com/api';

export const ticketsApi = {
  // Fetch all tickets
  fetchTickets: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('All tickets:', data);
      return data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  },

  // Fetch tickets by status (for filtering)
  fetchTicketsByStatus: async (status) => {
    try {
      console.log('Fetching tickets with status:', status); // Debug log
      const url = `${API_BASE_URL}/tickets?status=${status}`;
      console.log('API URL:', url); // Debug log
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Filtered tickets response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error fetching tickets by status:', error);
      throw error;
    }
  }
};

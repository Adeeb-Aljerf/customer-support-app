const API_BASE_URL = "https://openapi.pythonanywhere.com/api";

export const ticketsApi = {
  //? Fetch all tickets
  fetchTickets: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },

  //? Fetch tickets by status (for filtering)
  fetchTicketsByStatus: async (status) => {
    try {
      const url = `${API_BASE_URL}/tickets?status=${status}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching tickets by status:", error);
      throw error;
    }
  },

  //? Fetch conversation for a specific ticket
  fetchTicketConversation: async (ticketId) => {
    try {
      //? Get the ticket details which may include messages
      const ticketResponse = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
      if (!ticketResponse.ok) {
        throw new Error(`HTTP error! status: ${ticketResponse.status}`);
      }
      const ticketData = await ticketResponse.json();

      console.log("Ticket data from API:", {
        ticketId,
        hasMessages: !!ticketData.messages,
        hasConversation: !!ticketData.conversation,
        ticketKeys: Object.keys(ticketData),
      });

      //? Check if messages are included in the ticket data
      const messages = ticketData.messages || ticketData.conversation || [];

      console.log("Messages found:", {
        ticketId,
        messageCount: messages.length,
        firstMessage: messages[0],
      });

      //? Return both ticket and messages data
      return {
        ticket: ticketData,
        messages: messages,
      };
    } catch (error) {
      console.error("Error fetching ticket conversation:", error);
      throw error;
    }
  },

  //? Post a reply to a ticket
  postTicketReply: async (ticketId, message) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/tickets/${ticketId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            sender: "agent",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error posting reply:", error);
      throw error;
    }
  },
};

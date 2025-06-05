import { ticketsApi } from "../api/ticketsApi";
import { useTicketStore } from "../store/useTicketStore";

const usePostMessage = () => {
  const {
    selectedTicket,
    setConversation,
    conversation,
    setPostMessageLoading,
    setPostMessageError,
    postMessageLoading,
    postMessageError,
    // fetchConversation, 
  } = useTicketStore();

  const postMessage = async (message) => {
    if (!selectedTicket?.id || !message.trim()) {
      throw new Error("Ticket ID and message are required");
    }

    setPostMessageLoading(true);
    setPostMessageError(null);

    // 1. Optimistically add the message
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      content: message,
      timestamp: "Just now",
      sender: "Agent",
      isAgent: true,
      optimistic: true,
    };
    setConversation([...(conversation || []), optimisticMsg]);

    try {
      await ticketsApi.postTicketReply(selectedTicket.id, message.trim());
      // Optionally, refetch the conversation here to sync with server
      // fetchConversation(selectedTicket.id);
    } catch (err) {
      // Remove the optimistic message if failed
      setConversation((conversation || []).filter(msg => msg.id !== tempId));
      setPostMessageError(err.message);
      console.error("Error posting message:", err);
      throw err;
    } finally {
      setPostMessageLoading(false);
    }
  };

  return {
    postMessage,
    loading: postMessageLoading,
    error: postMessageError,
  };
};

export default usePostMessage;

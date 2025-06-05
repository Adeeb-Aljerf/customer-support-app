import { useCallback } from "react";
import { useTicketStore } from "../store/useTicketStore";
import useFetchConversation from "./useFetchConversation";

/**
 * Custom hook to handle ticket selection and conversation fetching
 * @returns {Object} - { selectedTicket, selectTicket, clearSelectedTicket, conversation, conversationLoading, conversationError }
 */
export const useTicketSelection = () => {
  const {
    selectedTicket,
    setSelectedTicket,
    clearSelectedTicket: clearStoreTicket,
  } = useTicketStore();

  // Use the conversation hook with the selected ticket ID
  const {
    conversation,
    loading: conversationLoading,
    error: conversationError,
    refetch: refetchConversation,
  } = useFetchConversation(selectedTicket?.id);

  const selectTicket = useCallback(
    (ticket) => {
      if (ticket?.id !== selectedTicket?.id) {
        setSelectedTicket(ticket);
      }
    },
    [selectedTicket?.id, setSelectedTicket]
  );

  const clearSelectedTicket = useCallback(() => {
    clearStoreTicket();
  }, [clearStoreTicket]);

  // Log state changes only when they actually change
  // useEffect(() => {
  //   console.log("useTicketSelection - state updated:", {
  //     ticketId: selectedTicket?.id,
  //     conversationLength: conversation?.length,
  //     loading: conversationLoading,
  //     error: conversationError,
  //   });
  // }, [
  //   selectedTicket?.id,
  //   conversation?.length,
  //   conversationLoading,
  //   conversationError,
  // ]);

  return {
    selectedTicket,
    selectTicket,
    clearSelectedTicket,
    conversation,
    conversationLoading,
    conversationError,
    refetchConversation,
  };
};

import { useEffect, useCallback, useRef } from "react";
import { ticketsApi } from "../api/ticketsApi";
import { useTicketStore } from "../store/useTicketStore";
import { formatDate } from "../../../utils/dateUtils";

const useFetchConversation = (ticketId) => {
  const {
    setConversation,
    setConversationLoading,
    setConversationError,
    conversation,
    conversationLoading,
    conversationError,
  } = useTicketStore();

  const fetchRef = useRef(null);

  const transformMessages = useCallback((ticketData, messagesData) => {
    const messages = [];

    if (ticketData.description) {
      messages.push({
        id: `ticket-${ticketData.id}`,
        content: ticketData.description,
        timestamp: formatDate(ticketData.created_at),
        sender: ticketData.customer_name || "Customer",
        isAgent: false,
      });
    }

    if (Array.isArray(messagesData)) {
      messagesData.forEach((message) => {
        const isAgent =
          message.is_agent === true ||
          message.isAgent === true ||
          (typeof message.sender === "string" &&
            message.sender.trim().toLowerCase() === "agent");

        messages.push({
          id: message.id,
          content: message.content || message.message,
          timestamp: formatDate(message.created_at || message.timestamp),
          sender: message.sender,
          isAgent,
        });
      });
    }

    return messages;
  }, []);

  const fetchConversation = useCallback(async () => {
    if (!ticketId) {
      setConversation([]);
      return;
    }

    // Cancel previous fetch if any
    if (fetchRef.current?.cancel) {
      fetchRef.current.cancel = true;
    }

    const fetchOperation = { cancel: false };
    fetchRef.current = fetchOperation;

    setConversationLoading(true);
    setConversationError(null);
    setConversation([]);

    try {
      const { ticket, messages } = await ticketsApi.fetchTicketConversation(
        ticketId
      );
      if (fetchOperation.cancel) return;

      const transformedMessages = transformMessages(ticket, messages);
      setConversation(transformedMessages);
    } catch (err) {
      if (!fetchOperation.cancel) {
        setConversationError(err.message);
      }
    } finally {
      if (fetchRef.current === fetchOperation) {
        setConversationLoading(false);
        fetchRef.current = null;
      }
    }
  }, [
    ticketId,
    setConversation,
    setConversationLoading,
    setConversationError,
    transformMessages,
  ]);

  useEffect(() => {
    fetchConversation();
    return () => {
      if (fetchRef.current) {
        fetchRef.current.cancel = true;
      }
    };
  }, [ticketId, fetchConversation]);

  return {
    conversation,
    loading: conversationLoading,
    error: conversationError,
    refetch: fetchConversation,
  };
};

export default useFetchConversation;

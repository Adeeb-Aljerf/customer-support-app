import { useMemo, memo, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ReplyForm from "../ReplyForm/ReplyForm";
import { useTicketSelection } from "../../hooks/useTicketSelection";
import usePostMessage from "../../hooks/usePostMessage";
import styles from "./Conversation.module.css";
import {
  PhoneIconSolid,
  EnvelopeIconSolid,
  MapPinIconSolid,
} from "../../../../components/common/icons";

const MemoizedMessageBubble = memo(MessageBubble);

//? Simple empty state component - no need for memo
const EmptyState = ({ message, subMessage }) => (
  <div className={styles.emptyState}>
    <div>
      <p>{message}</p>
      {subMessage && <p className={styles.emptyStateText}>{subMessage}</p>}
    </div>
  </div>
);

/**
 *? ConversationPanel Component
 *?Main panel for displaying ticket conversations
 */
const ConversationPanel = () => {
  const {
    selectedTicket,
    conversation,
    conversationLoading,
    conversationError,
  } = useTicketSelection();

  const { postMessage, loading: postMessageLoading } = usePostMessage();
  const messagesContainerRef = useRef(null);
  const previousMessageCountRef = useRef(0);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll only on initial load
  useEffect(() => {
    if (!conversationLoading && conversation?.length > 0) {
      scrollToBottom();
      previousMessageCountRef.current = conversation.length;
    }
  }, [conversationLoading]);

  // Scroll only when new messages are added
  useEffect(() => {
    if (
      !conversationLoading &&
      conversation?.length > previousMessageCountRef.current
    ) {
      scrollToBottom();
      previousMessageCountRef.current = conversation.length;
    }
  }, [conversation, conversationLoading]);

  const handleSendMessage = async (message) => {
    if (!selectedTicket?.id) {
      console.error("No ticket selected");
      return;
    }

    try {
      await postMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Memoize message transformation since it's used in a list
  const transformedMessages = useMemo(() => {
    if (!conversation?.length) return [];

    return conversation.map((msg, index) => ({
      id: msg.id || `msg-${index}-${msg.timestamp || Date.now()}`,
      message: msg.content,
      timestamp: msg.timestamp,
      sender: msg.sender,
      isAgent: msg.isAgent,
      receiverName:
        selectedTicket?.customer_name || selectedTicket?.customer || "Unknown",
    }));
  }, [conversation, selectedTicket?.customer_name, selectedTicket?.customer]);

  const customerInfo = useMemo(
    () => ({
      name:
        selectedTicket?.customer_name || selectedTicket?.customer || "Unknown",
      subject: selectedTicket?.subject,
      timestamp: selectedTicket?.timestamp,
    }),
    [
      selectedTicket?.customer_name,
      selectedTicket?.customer,
      selectedTicket?.subject,
      selectedTicket?.timestamp,
    ]
  );

  if (!selectedTicket) {
    return (
      <div className={styles.conversationPanel}>
        <EmptyState
          message="Select a ticket to view conversation"
          subMessage="Click on any ticket from the list"
        />
      </div>
    );
  }

  if (conversationLoading) {
    return (
      <div className={styles.conversationPanel}>
        <div className={styles.backgroundImage} />
        <div className={styles.messagesContainer}>
          <EmptyState message="Loading conversation..." />
        </div>
        <ReplyForm onSendMessage={handleSendMessage} disabled={true} />
      </div>
    );
  }

  if (conversationError) {
    return (
      <div className={styles.conversationPanel}>
        <div className={styles.backgroundImage} />
        <div className={styles.messagesContainer}>
          <EmptyState
            message={`Error: ${conversationError}`}
            style={{ color: "#EF4444" }}
          />
        </div>
        <ReplyForm onSendMessage={handleSendMessage} disabled={true} />
      </div>
    );
  }

  return (
    <div className={styles.conversationPanel}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.backgroundImage} />

        {/* Customer Info */}
        <div className={styles.customerInfoContainer}>
          <div className={styles.customerAvatarPlaceholder}></div>
          <div className={styles.customerDetailsContainer}>
            <div className={styles.customerName}>{customerInfo.name}</div>
            <div className={styles.customerIcons}>
              <div className={styles.iconContainer}>
                <PhoneIconSolid className={styles.icon} />
              </div>
              <div className={styles.iconContainer}>
                <EnvelopeIconSolid className={styles.icon} />
              </div>
              <div className={styles.iconContainer}>
                <MapPinIconSolid className={styles.icon} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subjectContainer}>
          <div className={styles.subjectInfoContainer}>
            <p className={styles.subjectTitle}>Ticket Subject </p>
            <p className={styles.subjectContent}>{customerInfo.subject}</p>
          </div>
          {customerInfo.timestamp}
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className={styles.messagesContainer}>
        {!transformedMessages.length ? (
          <EmptyState
            message="No messages yet"
            subMessage="Start the conversation below"
          />
        ) : (
          <div>
            {transformedMessages.map((msg) => (
              <MemoizedMessageBubble
                key={msg.id}
                {...msg}
                receiverName={msg.receiverName}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <ReplyForm
        onSendMessage={handleSendMessage}
        disabled={conversationLoading || postMessageLoading}
      />
    </div>
  );
};

// Memoize the entire ConversationPanel to prevent unnecessary re-renders
export default memo(ConversationPanel);

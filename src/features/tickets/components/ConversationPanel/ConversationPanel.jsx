import { memo, useRef} from "react";
import MessageBubble from "./MessageBubble";
import ReplyForm from "../ReplyForm/ReplyForm";
import styles from "./Conversation.module.css";
import {
  PhoneIconSolid,
  EnvelopeIconSolid,
  MapPinIconSolid,
  XMarkIconSolid,
} from "../../../../components/common/icons";
import { useTicketChatStore } from "../../store/useTicketChatStore";


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

  const {ticketChat,loading ,postReply}=useTicketChatStore();
  const messagesContainerRef = useRef(null);

const handleSendMessage = (message) => {
  if (!ticketChat?.id) return;
  postReply(ticketChat.id, message);
};

  
  // 🔄 Show loading spinner
  if (loading) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          borderLeft: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        {/* Inline keyframes for the spinner */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }


 // If no ticket selected, show placeholder
  if (!ticketChat || !ticketChat.id) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          borderLeft: "1px solid #e5e7eb",
        }}
      >
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          <p style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            Select a chat
          </p>
          <p style={{ fontSize: "1.2rem", color: "#9ca3af" }}>
            Choose a ticket from the list to view messages
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className={styles.conversationPanel}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.backgroundImage} />
        <button
          className={styles.closeButton}
          // onClick={clearSelectedTicket}
          aria-label="Close conversation"
        >
          <XMarkIconSolid className={styles.closeIcon} />
        </button>

        {/* Customer Info */}
        <div className={styles.customerInfoContainer}>
          <div className={styles.customerAvatarPlaceholder}></div>
          <div className={styles.customerDetailsContainer}>
            <div className={styles.customerName}>{ticketChat.customer_name}</div>
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
            <p className={styles.subjectContent}>{ticketChat.subject}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className={styles.messagesContainer}>
        {!ticketChat?.messages?.length ? (
          <EmptyState
            message="No messages yet"
            subMessage="Start the conversation below"
          />
        ) : (
          <div> 
            {ticketChat.messages.map((msg) => (
              <MessageBubble
                key={msg.timestamp}
                message={msg.message}
                customerName={ticketChat.customer_name}
                sender={msg.sender}
                timestamp={msg.timestamp}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reply Form */}
            <ReplyForm onSendMessage={handleSendMessage} />

    </div>
  );
};

export default memo(ConversationPanel);

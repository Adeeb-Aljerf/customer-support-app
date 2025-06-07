import styles from "./MessageBubble.module.css";

const MessageBubble = ({ message, timestamp, isAgent, receiverName }) => (
  <div
    className={`${styles.messageBubble} ${
      isAgent ? styles.messageBubbleRight : styles.messageBubbleLeft
    }`}
  >
    <div className={styles.timestamp}>{timestamp}</div>
    <div className={isAgent ? styles.senderInfo : styles.receiverInfo}>
      <div className={isAgent ? styles.agentAvatar : styles.receiverAvatar} />
      <div className={isAgent ? styles.agentLabel : styles.receiverLabel}>
        {isAgent ? "Agent" : receiverName}
      </div>
    </div>
    <div className={isAgent ? styles.agentMessage : styles.receiverMessage}>
      {message}
    </div>
    
  </div>
);

export default MessageBubble;

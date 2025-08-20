
import styles from "./MessageBubble.module.css";

function MessageBubble({ key, message, timestamp, sender, customerName }) {
  return (
    <div
      key={key}
      className={`${styles.messageBubble} ${
        sender === "agent" ? styles.messageBubbleRight : styles.messageBubbleLeft
      }`}
    >
      <div className={styles.timestamp}>{timestamp}</div>
      <div className={sender === "agent" ? styles.senderInfo : styles.receiverInfo}>
        <div className={sender === "agent" ? styles.agentAvatar : styles.receiverAvatar} />
        <div className={sender === "agent" ? styles.agentLabel : styles.receiverLabel}>
  {sender === "agent" ? "Agent" : customerName}
</div>
      </div>
      <div className={sender === "agent" ? styles.agentMessage : styles.receiverMessage}>
        {message}
      </div>
    </div>
  );
}


export default MessageBubble;

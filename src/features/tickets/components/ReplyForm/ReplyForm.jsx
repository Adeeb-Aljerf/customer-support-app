import  { useState } from "react";
import Icon from "../../../../components/common/icons/Icon";
import styles from "./ReplyForm.module.css";

const ReplyForm = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className={styles.replyForm}>
      <form
        onSubmit={handleSubmit}
        style={{ position: "relative", height: "100%", width: "100%" }}
      >
        {/* Left container */}
        <div className={styles.leftContainer}>
          <Icon
            name="face-smile"
            variant="outline"
            className={styles.emojiIcon}
            color="#645F6D"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="enter message"
            disabled={disabled}
            className={styles.messageInput}
          />
        </div>

        {/* Right container */}
        <div className={styles.rightContainer}>
          {/* Attachment icons */}
          <div className={styles.attachmentContainer}>
            <Icon
              name="photo"
              variant="solid"
              className={styles.attachmentIcon}
              color="#645F6D"
            />
            <Icon
              name="paper-clip"
              variant="solid"
              className={styles.attachmentIcon}
              color="#645F6D"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className={styles.sendButton}
          >
            <Icon
              name="paper-airplane"
              variant="solid"
              color="#FFFFFF"
              className={styles.sendIcon}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;

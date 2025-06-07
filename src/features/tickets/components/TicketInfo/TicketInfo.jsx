import styles from "./TicketInfo.module.css";

export default function TicketInfo() {
  return (
    <div className={styles.ticketInfo}>
      {/* First Frame */}
      <div className={styles.firstFrame}>
        <span className={styles.text}>Name</span>
        <span className={styles.text}>Subject</span>
      </div>

      {/* Second Frame */}
      <div className={styles.secondFrame}>
        <span className={styles.text}>Timestamp</span>
        <span className={styles.text}>State</span>
      </div>
    </div>
  );
}

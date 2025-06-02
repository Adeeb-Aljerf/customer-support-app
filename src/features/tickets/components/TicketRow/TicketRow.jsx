import styles from './TicketRow.module.css';

export default function TicketRow({ ticket }) {
  if (!ticket) {
    return (
      <div className={styles.ticketRow}>
        Ticket Row Content
      </div>
    );
  }

  // Function to format timestamp to "X hrs ago" format
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'N/A';
    
    const now = new Date();
    const ticketDate = new Date(dateString);
    const diffInMs = now - ticketDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className={styles.ticketRow}>
      {/* First Container */}
      <div className={styles.firstContainer}>
        <div className={styles.avatarPlaceholder}></div>
        <div className={styles.name}>
          {ticket.customer_name || ticket.customer || 'Unknown'}
        </div>
        <div className={styles.status}>
          {ticket.subject || 'No Subject'}
        </div>
      </div>

      {/* Second Container */}
      <div className={styles.secondContainer}>
        <div className={styles.timestamp}>
          {formatTimeAgo(ticket.created_at)}
        </div>
        <div className={styles.statusBadge}>
          {ticket.status || 'Open'}
        </div>
      </div>
    </div>
  );
}

import { useTicketSelection } from "../../hooks/useTicketSelection";
import { formatTicketTime } from "../../../../utils/dateUtils";
import styles from "./TicketRow.module.css";

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "open":
      return styles.statusBadgeOpen;
    case "closed":
      return styles.statusBadgeClosed;
    case "pending":
      return styles.statusBadgePending;
    default:
      return styles.statusBadgeOpen;
  }
};

const TicketRow = ({ ticket }) => {
  const { selectedTicket, selectTicket } = useTicketSelection();

  if (!ticket) {
    return <div className={styles.ticketRow}>Ticket Row Content</div>;
  }

  const isSelected = selectedTicket?.id === ticket.id;
  const customerName = ticket.customer_name || ticket.customer || "Unknown";
  const subject = ticket.subject || "No Subject";
  const status = ticket.status || "Open";
  const timestamp = formatTicketTime(ticket.created_at, ticket);

  return (
    <div
      className={`${styles.ticketRow} ${isSelected ? styles.selected : ""}`}
      onClick={() => selectTicket(ticket)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.firstContainer}>
        <div className={styles.avatarPlaceholder}></div>
        <div className={styles.name}>{customerName}</div>
        <div className={styles.status}>{subject}</div>
      </div>

      <div className={styles.secondContainer}>
        <div className={styles.timestamp}>{timestamp}</div>
        <div className={`${styles.statusBadge} ${getStatusClass(status)}`}>
          {status}
        </div>
      </div>
    </div>
  );
};

export default TicketRow;

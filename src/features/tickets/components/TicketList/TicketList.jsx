import { useFetchTickets } from "../../hooks/useFetchTickets";
import TicketRow from "../TicketRow/TicketRow";
import styles from "./TicketList.module.css";

export default function TicketList() {
  const { tickets, loading, error, currentFilter, search } = useFetchTickets();

  const { isSearching, searchTerm } = search;

  if (loading) {
    return (
      <div className={styles.ticketList}>
        <div className={styles.loading}>Loading {currentFilter} tickets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.ticketList}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className={styles.ticketList}>
        <div className={styles.loading}>
          {isSearching
            ? `No customers found with name "${searchTerm}"`
            : `No ${currentFilter} tickets found`}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ticketList}>
      {tickets.map((ticket) => (
        <TicketRow key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

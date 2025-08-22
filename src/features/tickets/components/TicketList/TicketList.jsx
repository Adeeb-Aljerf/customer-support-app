import { useEffect } from "react";
import { useTicketsStore } from "../../store/useTicketsStore";
import TicketRow from "../TicketRow/TicketRow";
import styles from "./TicketList.module.css";

const TicketList = () => {
  const { fetchTickets, loading, error, getFilteredTickets } = useTicketsStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  if (loading) return <div className={styles.loading}>Loading tickets...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const filteredTickets = getFilteredTickets();

  return (
    <div className={styles.ticketList}>
      {filteredTickets.map((ticket) => (
        <TicketRow key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;

import { useEffect } from "react";
import{ useTicketStore} from "../../store/useTicketStore";
import TicketRow from "../TicketRow/TicketRow";
import styles from "./TicketList.module.css";

const TicketList = () => {
  const { fetchTickets, currentFilter, loading, error, getTicketsByStatus } =
    useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  if (loading) return <div className={styles.loading}>Loading tickets...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const filteredTickets = getTicketsByStatus(currentFilter);

  return (
    <div className={styles.ticketList}>
      {filteredTickets.map((ticket) => (
        <TicketRow key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;

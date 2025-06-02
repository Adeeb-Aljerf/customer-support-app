import Icon from "../../common/icons/Icon";
import TicketStatusButton from "../../common/TicketStatusButton/ticketStatusButton";
import { useTicketStore } from "../../../features/tickets/store/useTicketStore";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const { currentFilter, fetchAndFilterTickets } = useTicketStore();

  const handleStatusClick = (statusId) => {
    console.log('Sidebar: clicked status:', statusId);
    fetchAndFilterTickets(statusId);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.ticketStatusContainer}>
        <TicketStatusButton 
          isSelected={currentFilter === 'open'}
          onClick={() => handleStatusClick('open')}
        >
          <Icon name="check-circle" color="var(--color-secondary)" variant="solid" size='20'></Icon>
          Open
        </TicketStatusButton>
        <TicketStatusButton 
          isSelected={currentFilter === 'pending'}
          onClick={() => handleStatusClick('pending')}
        >
          <Icon name="clock" color="var(--color-success)" variant="solid" size='20'></Icon>
          Pending
        </TicketStatusButton>
        <TicketStatusButton 
          isSelected={currentFilter === 'closed'}
          onClick={() => handleStatusClick('closed')}
        >
          <Icon name="x-circle" color="var(--color-danger)" variant="solid" size='20'></Icon>
          Closed
        </TicketStatusButton>
      </div>
    </div>
  );
};

export default Sidebar;

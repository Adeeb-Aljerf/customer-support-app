import {useTicketStore} from "../../store/useTicketStore";
import TicketStatusButton from "../../../../components/common/TicketStatusButton/ticketStatusButton";
import Icon from "../../../../components/common/icons/Icon";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { setFilter, currentFilter } = useTicketStore();

  const handleStatusClick = (status) => {
    setFilter(status);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.ticketStatusContainer}>
        {["open", "pending", "closed"].map((status) => (
          <TicketStatusButton
            key={status}
            isSelected={currentFilter === status}
            onClick={() => handleStatusClick(status)}
          >
            <Icon
              name={
                status === "open"
                  ? "check-circle"
                  : status === "pending"
                  ? "clock"
                  : "x-circle"
              }
              color={
                status === "open"
                  ? "var(--color-secondary)"
                  : status === "pending"
                  ? "var(--color-success)"
                  : "var(--color-danger)"
              }
              size={20}
              variant="solid"
            />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </TicketStatusButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

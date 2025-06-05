import React from "react";
import styles from "./TicketManagement.module.css";
import TicketInfo from "../features/tickets/components/TicketInfo/TicketInfo";
import TicketList from "../features/tickets/components/TicketList/TicketList";
import Pagination from "../components/common/Pagination/Pagination";
import ConversationPanel from "../features/tickets/components/ConversationPanel/ConversationPanel";

const TicketManagement = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.ticketSection}>
          <div className={styles.ticketManagementContainer}>
            <TicketInfo />
            <TicketList />
            <Pagination />
          </div>
        </div>

        <ConversationPanel />
      </div>
    </div>
  );
};

export default TicketManagement;

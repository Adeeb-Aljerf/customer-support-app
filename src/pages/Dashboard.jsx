import Navbar from "../components/layout/Navbar/Navbar";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Pagination from "../components/common/Pagination/Pagination";
import TicketInfo from "../features/tickets/components/TicketInfo/TicketInfo";
import TicketList from "../features/tickets/components/TicketList/TicketList";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.a}>
          <div className={styles.dashboardContainer}>
            <TicketInfo />
            <TicketList />
            <Pagination />
          </div>
        </div>

        <div className={styles.chatContainer}>
          {/* Chat content will go here */}
          Chat Container
        </div>
      </div>
    </div>
  );
}

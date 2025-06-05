import { Icon } from "../../common/icons/main.js";
import { useSearch } from "../../../features/tickets/hooks/useSearch";
import styles from "./Header.module.css";

const Header = ({ title = "Ticket List" }) => {
  const { searchTerm, handleSearchChange } = useSearch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by name"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Icon name="magnifying-glass" size={20} color="var(--color-gray)" />
          </div>

          <button className={styles.filterButton}>
            <Icon name="funnel" size={20} color="#645F6D" variant="solid" />
          </button>
        </div>
      </div>

      <div className={styles.userActions}>
        <button className={styles.notificationButton}>
          <Icon
            name="bell"
            variant="solid"
            size={20}
            color="var(--color-gray)"
          />
        </button>

        <button className={styles.userButton}>
          <Icon name="user-circle" variant="solid" size={20} color="white" />
        </button>
      </div>
    </header>
  );
};

export default Header;

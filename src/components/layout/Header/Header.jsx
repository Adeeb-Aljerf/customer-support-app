import { Icon } from "../../common/icons/main.js";
import styles from "./Header.module.css";

const Header = ({ title = "Ticket List" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
            <Icon name="magnifying-glass" size={20} color="var(--color-gray)" />
          </div>

          <button className={styles.filterButton}>
            <Icon name="funnel" size={20} color="var(--color-gray)" />
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

import { useState } from "react";
import { Icon } from "../../common/icons/main.js";
import styles from "./Navbar.module.css";
import logoImage from "../../../assets/logos/Logo.png";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("tickets");

  // Handle icon selection
  const handleIconClick = (item) => {
    setActiveItem(item);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div>
        <img
          src={logoImage}
          alt="Customer Support App Logo"
          className={styles.logoImage}
        />
      </div>

      {/* Main Navigation Container */}
      <div className={styles.navContainer}>
        {/* Dashboard */}
        <div
          className={`${styles.navItem} ${
            activeItem === "dashboard" ? styles.active : ""
          }`}
          onClick={() => handleIconClick("dashboard")}
        >
          <Icon
            name="squares-2x2"
            variant="solid"
            size={20}
            color={
              activeItem === "dashboard"
                ? "white"
                : "var(--color-ui-nav-item-inactive)"
            }
          />
        </div>

        {/* Tickets */}
        <div
          className={`${styles.navItem} ${
            activeItem === "tickets" ? styles.active : ""
          }`}
          onClick={() => handleIconClick("tickets")}
        >
          <Icon
            name="ticket"
            variant="solid"
            size={20}
            color={
              activeItem === "tickets"
                ? "white"
                : "var(--color-ui-nav-item-inactive)"
            }
          />
        </div>

        {/* User Group */}
        <div
          className={`${styles.navItem} ${
            activeItem === "users" ? styles.active : ""
          }`}
          onClick={() => handleIconClick("users")}
        >
          <Icon
            name="user-group"
            variant="solid"
            size={20}
            color={
              activeItem === "users"
                ? "white"
                : "var(--color-ui-nav-item-inactive)"
            }
          />
        </div>

        {/* Document Chart */}
        <div
          className={`${styles.navItem} ${
            activeItem === "reports" ? styles.active : ""
          }`}
          onClick={() => handleIconClick("reports")}
        >
          <Icon
            name="document-chart-bar"
            variant="solid"
            size={20}
            color={
              activeItem === "reports"
                ? "white"
                : "var(--color-ui-nav-item-inactive)"
            }
          />
        </div>

        {/* Settings */}
        <div
          className={`${styles.navItem} ${
            activeItem === "settings" ? styles.active : ""
          }`}
          onClick={() => handleIconClick("settings")}
        >
          <Icon
            name="cog-6-tooth"
            variant="solid"
            size={20}
            color={
              activeItem === "settings"
                ? "white"
                : "var(--color-ui-nav-item-inactive)"
            }
          />
        </div>
      </div>

      {/* Spacer to push logout to bottom */}
      <div className={styles.spacer}></div>

      {/* Logout Button */}
      <div
        className={styles.logoutButton}
        onClick={() => handleIconClick("logout")}
      >
        <Icon
          name="arrow-right-start-on-rectangle"
          variant="solid"
          size={24}
          color={
            activeItem === "logout"
              ? "white"
              : "var(--color-ui-nav-item-inactive)"
          }
        />
      </div>
    </aside>
  );
};

export default Sidebar;

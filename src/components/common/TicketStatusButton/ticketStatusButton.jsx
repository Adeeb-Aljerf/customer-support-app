import styles from './ticketStatusButton.module.css';

const TicketStatusButton = ({ children, onClick, isSelected }) => {
  return (
    <button 
      className={`${styles.ticketStatusButton} ${isSelected ? styles.selected : ''}`} 
      onClick={onClick}
    >
      {children}
      {isSelected && <div className={styles.selectedIndicator}></div>}
    </button>
  );
};

export default TicketStatusButton;

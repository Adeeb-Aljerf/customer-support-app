import Sidebar from "./components/layout/Sidebar/Sidebar";
import Header from "./components/layout/Header/Header";
import styles from "./components/layout/Sidebar/Sidebar.module.css";
import "./styles/globals.css";

function App() {
  return (
    <>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
      </div>
    </>
  );
}

export default App;
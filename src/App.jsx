import Navbar from "./components/layout/Navbar/Navbar";
import Header from "./components/layout/Header/Header";
// import styles from "./components/layout/Navbar/Navbar.module.css";
import "./styles/globals.css";
import TicketManagement from "./pages/TicketManagement";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <TicketManagement />
    </>
  );
}

export default App;

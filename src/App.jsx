import Navbar from "./components/layout/Navbar/Navbar";
import Header from "./components/layout/Header/Header";
// import styles from "./components/layout/Navbar/Navbar.module.css";
import "./styles/globals.css";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Dashboard/>
      <Sidebar/>
    
    </>
  );
}

export default App;
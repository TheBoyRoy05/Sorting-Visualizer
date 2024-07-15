/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import Dashboard from "./Components/Dashboard";
import Display from "./Components/Display";
import Footer from "./Components/Footer";
import "./Styles/index.css";

const App: FC = () => {
  return (
    <div className="app">
      <Dashboard />
      <Display />
      <Footer />
    </div>
  );
};

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import Display from "./Components/Display";
import { useSortContext } from "./Utils/SortContext";
import Dashboard from "./Components/Dashboard";
import "./Styles/index.css";

const App: FC = () => {
  const { stats } = useSortContext();

  return (
    <div className="app">
      <Dashboard />
      <div className="stats">
        <p className="stats-text">{`Statistics: ${stats.comparisons} Comparisons, ${stats.swaps} Swaps, ${stats.time} Sec`}</p>
      </div>
      <Display />
    </div>
  );
};

export default App;

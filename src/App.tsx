/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import Display from "./Components/Display";
import Slider from "./Components/Slider";
import { useSortContext } from "./Utils/SortContext";
import Dashboard from "./Components/Dashboard";
import "./Styles/index.css";

const App: FC = () => {
  const {
    arraySize,
    setArraySize,
    barsOnTop,
    setBarsOnTop,
    sortSpeed,
    setSortSpeed,
  } = useSortContext();

  const {
    stats,
  } = useSortContext();

  return (
    <div className="app">
      <Dashboard />
      <div className="other-options">
        <p className="other-options-text">Other Options: </p>
        <button onClick={() => setBarsOnTop(!barsOnTop)}>
          {"Bars on " + (barsOnTop ? "Top" : "Bottom")}
        </button>
      </div>
      <Slider
        text="Array Size"
        min={4}
        max={100}
        step={1}
        value={arraySize}
        setValue={setArraySize}
      />
      <Slider
        text="Sort Speed"
        min={1}
        max={100}
        step={1}
        value={sortSpeed}
        setValue={setSortSpeed}
      />
      <div className="stats">
        <p className="stats-text">{`Statistics: ${stats.comparisons} Comparisons, ${stats.swaps} Swaps, ${stats.time} Sec`}</p>
      </div>
      <Display />
    </div>
  );
};

export default App;

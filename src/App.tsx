import { FC, useEffect, useState } from "react";
import Display, { BarProps } from "./Components/Display";
import Slider from "./Components/Slider";
import SelectionSort from "./Algorithms/Selection.ts";
import InsertionSort from "./Algorithms/Insertion.ts";

const App: FC = () => {
  const DISPLAY_WIDTH = 1000;
  const MAX_BAR_WIDTH = 100;

  const [arraySize, setArraySize] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(10);
  const [bars, setBars] = useState<BarProps[]>([]);

  const timeInterval = Math.min(100 / bars.length / sortSpeed, 1) * 1000;

  const generate = (arraySize: number) => {
    const bars = Array.from({ length: arraySize }, () =>
      getRandomInt(10, 200)
    ).map((height) => ({
      height,
      width: Math.min(DISPLAY_WIDTH / arraySize, MAX_BAR_WIDTH),
      status: "unsorted" as const,
    }));
    setBars(bars);
  };

  useEffect(() => {
    generate(arraySize);
  }, [arraySize]);

  return (
    <div className="app">
      <button onClick={() => generate(arraySize)}>{"Generate"}</button>
      <button onClick={() => SelectionSort(bars, setBars, timeInterval, true)}>
        {"Selection"}
      </button>
      <button onClick={() => InsertionSort(bars, setBars, timeInterval, true)}>
        {"Insertion"}
      </button>
      <Slider
        text="Array Size"
        min={3}
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
      <Display bars={bars} />
    </div>
  );
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default App;

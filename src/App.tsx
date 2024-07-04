import { FC, useEffect, useState } from "react";
import SelectionSort from "./Algorithms/Selection";
import Display, { BarProps } from "./Components/Display";
import Slider from "./Components/Slider";

const App: FC = () => {
  const DISPLAY_WIDTH = 1000;
  const MAX_WIDTH = 100;

  const [arraySize, setArraySize] = useState(10);
  const [bars, setBars] = useState<BarProps[]>([]);

  const generate = (arraySize: number) => {
    const bars = Array.from({ length: arraySize }, () =>
      getRandomInt(10, 200)
    ).map((height) => ({
      height,
      width: Math.min(DISPLAY_WIDTH / arraySize, MAX_WIDTH),
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
      <button onClick={() => SelectionSort(bars, setBars)}>
        {"Selection"}
      </button>
      <Slider
        text="Array Size"
        min={3}
        max={100}
        value={arraySize}
        setValue={setArraySize}
      />
      <Display bars={bars} />
    </div>
  );
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default App;

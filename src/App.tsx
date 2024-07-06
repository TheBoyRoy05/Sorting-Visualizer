import { FC, useEffect, useState } from "react";
import Display from "./Components/Display";
import Slider from "./Components/Slider";
import SelectionSort from "./Algorithms/Selection.ts";
import InsertionSort from "./Algorithms/Insertion.ts";
import BubbleSort from "./Algorithms/Bubble.ts";
import MergeSort from "./Algorithms/Merge.ts";
import QuickSort from "./Algorithms/Quick.ts";
import { BarProps, partitionType } from "./Utils/Props.ts";

const App: FC = () => {
  const DISPLAY_WIDTH = 1000;
  const MAX_BAR_WIDTH = 100;

  const [arraySize, setArraySize] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(10);
  const [ascending, setAscending] = useState(true);
  const [multiThread, setMultiThread] = useState(false);
  const [partition, setPartition] = useState<partitionType>("Lomuto");
  const [bars, setBars] = useState<BarProps[]>([]);

  const interval = Math.min(100 / bars.length / sortSpeed, 1) * 1500;
  const sort_info = {
    bars,
    setBars,
    interval,
    ascending,
    multiThread,
    partition,
  };

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
      <div className="sorts">
        <p className="sorts-text">Sorts:</p>
        <button onClick={() => SelectionSort(sort_info)}>{"Selection"}</button>
        <button onClick={() => InsertionSort(sort_info)}>{"Insertion"}</button>
        <button onClick={() => BubbleSort(sort_info)}>{"Bubble"}</button>
        <button onClick={() => MergeSort(sort_info)}>{"Merge"}</button>
        <button onClick={() => QuickSort(sort_info)}>{"Quick"}</button>
      </div>
      <div className="options">
        <p className="options-text">Options: </p>
        <button onClick={() => generate(arraySize)}>{"Generate"}</button>
        <button onClick={() => setAscending(!ascending)}>
          {ascending ? "Ascending" : "Descending"}
        </button>
        <button onClick={() => setMultiThread(!multiThread)}>
          {multiThread ? "Multi-Thread" : "Single Thread"}
        </button>
        <button
          onClick={() =>
            setPartition(partition === "Lomuto" ? "Hoare" : "Lomuto")
          }
        >
          {partition}
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
      <Display bars={bars} />
    </div>
  );
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import Display from "./Components/Display";
import Slider from "./Components/Slider";
import { useSortContext } from "./Utils/SortContext";
import { getRandomInt } from "./Utils/SortUtils";
import {
  useBozoSort,
  useBubbleSort,
  useHeapSort,
  useInsertionSort,
  useMergeSort,
  useQuickSort,
  useSelectionSort,
} from "./Algorithms/SortHooks";

const App: FC = () => {
  const {
    arraySize,
    setArraySize,
    sortSpeed,
    setSortSpeed,
    ascending,
    setAscending,
    multiThread,
    setMultiThread,
    partition,
    setPartition,
    setBars,
    stats,
    setStats,
  } = useSortContext();

  const DISPLAY_WIDTH = 1000;
  const MAX_BAR_WIDTH = 100;

  const generate = (size: number) => {
    const newBars = Array.from({ length: size }, () =>
      getRandomInt(10, 200)
    ).map((height) => ({
      height,
      width: Math.min(DISPLAY_WIDTH / size, MAX_BAR_WIDTH),
      status: "unsorted" as const,
    }));
    setBars(newBars);
    setStats({ comparisons: 0, swaps: 0, time: 0 });
  };

  useEffect(() => {
    generate(arraySize);
  }, [arraySize]);

  return (
    <div className="app">
      <div className="sorts">
        <p className="sorts-text">Sorts:</p>
        <button onClick={useSelectionSort()}>{"Selection"}</button>
        <button onClick={useInsertionSort()}>{"Insertion"}</button>
        <button onClick={useBubbleSort()}>{"Bubble"}</button>
        <button onClick={useHeapSort()}>{"Heap"}</button>
        <button onClick={useMergeSort()}>{"Merge"}</button>
        <button onClick={useQuickSort()}>{"Quick"}</button>
        <button onClick={useBozoSort()}>{"Bozo"}</button>
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
      <div className="stats">
        <p className="stats-text">{`Statistics: ${stats.comparisons} Comparisons, ${stats.swaps} Swaps, ${stats.time} Sec`}</p>
      </div>
      <Display />
    </div>
  );
};

export default App;

import { FC } from "react";
import Display from "./Components/Display";
import Slider from "./Components/Slider";
import SelectionSort from "./Algorithms/Selection";
import InsertionSort from "./Algorithms/Insertion";
import BubbleSort from "./Algorithms/Bubble";
import MergeSort from "./Algorithms/Merge";
import QuickSort from "./Algorithms/Quick";
import HeapSort from "./Algorithms/Heap";
import { useSortContext } from "./Utils/SortContext";

const App: FC = () => {
  const {
    arraySize, setArraySize,
    sortSpeed, setSortSpeed,
    ascending, setAscending,
    multiThread, setMultiThread,
    partition, setPartition, 
    generate
  } = useSortContext();

  return (
    <div className="app">
      <div className="sorts">
        <p className="sorts-text">Sorts:</p>
        <button onClick={() => SelectionSort()}>{"Selection"}</button>
        <button onClick={() => InsertionSort()}>{"Insertion"}</button>
        <button onClick={() => BubbleSort()}>{"Bubble"}</button>
        <button onClick={() => HeapSort()}>{"Heap"}</button>
        <button onClick={() => MergeSort()}>{"Merge"}</button>
        <button onClick={() => QuickSort()}>{"Quick"}</button>
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
      <Display />
    </div>
  );
};

export default App;
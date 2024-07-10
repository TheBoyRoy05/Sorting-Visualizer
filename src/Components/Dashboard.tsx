import { FC } from "react";
import { sortType } from "../Utils/Props";
import { useSortContext } from "../Utils/SortContext";
import { capitalize } from "../Utils/AppUtils";
import {
  useBozoSort,
  useBubbleSort,
  useHeapSort,
  useInsertionSort,
  useMergeSort,
  useQuickSort,
  useSelectionSort,
} from "../Algorithms/SortHooks";
import "../Styles/dashboard.css"

const Dashboard: FC = () => {
  const {sort, setSort} = useSortContext();

  const selectionSort = useSelectionSort();
  const bubbleSort = useBubbleSort();
  const insertionSort = useInsertionSort();
  const heapSort = useHeapSort();
  const quickSort = useQuickSort();
  const mergeSort = useMergeSort();
  const bozoSort = useBozoSort();

  const handleSort = () => {
    switch (sort) {
      case "selection":
        return selectionSort();
      case "bubble":
        return bubbleSort();
      case "insertion":
        return insertionSort();
      case "heap":
        return heapSort();
      case "quick":
        return quickSort();
      case "merge":
        return mergeSort();
      case "bozo":
        return bozoSort();
    }
  };

  return (
    <div className="dashboard">
      <p className="title">Sorting Visualizer</p>
      <select
        className="sorts"
        value={sort}
        onChange={(e) => setSort(e.target.value as sortType)}
      >
        <option disabled={true}>Normal Sorts:</option>
        <option value="selection">{"Selection"}</option>
        <option value="bubble">{"Bubble"}</option>
        <option value="insertion">{"Insertion"}</option>
        <option value="heap">{"Heap"}</option>
        <option value="quick">{"Quick"}</option>
        <option value="merge">{"Merge"}</option>
        <option disabled={true}>Goofy Ahh Sorts:</option>
        <option value="bozo">{"Bozo"}</option>
      </select>
      <button onClick={handleSort}>
        {"Visualize " + capitalize(sort) + " Sort!"}
      </button>
    </div>
  )
};

export default Dashboard;

import { FC } from "react";
import { goofySortType, normalSortType, optionType } from "../Utils/Props";
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
import "../Styles/dashboard.css";
import Dropdown from "./Dropdown";

const Dashboard: FC = () => {
  const { sort, setSort } = useSortContext();

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

  const normalSorts: normalSortType[] = [
    "selection",
    "bubble",
    "insertion",
    "heap",
    "quick",
    "merge",
  ];
  const goofySorts: goofySortType[] = ["bozo"];

  const sortOptions: optionType[] = [
    ...normalSorts.map((sort) => ({
      text: capitalize(sort),
      handleClick: () => setSort(sort),
    })),
    { text: "Goofy Ahh Sorts" },
    ...goofySorts.map((sort) => ({
      text: capitalize(sort),
      handleClick: () => setSort(sort),
    })),
  ];

  return (
    <div className="dashboard">
      <h2 className="title">Sorting Visualizer</h2>
      <Dropdown text="Sorting Algorithms" options={sortOptions} />
      <button className="btn main-btn" onClick={handleSort}>
        {"Visualize " + capitalize(sort) + " Sort!"}
      </button>
    </div>
  );
};

export default Dashboard;

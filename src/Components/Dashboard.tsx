/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { goofySortType, normalSortType, optionType } from "../Utils/Props";
import { useSortContext } from "../Utils/SortContext";
import { capitalize, getRandomInt } from "../Utils/AppUtils";
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
  const {
    sort,
    setSort,
    arraySize,
    ascending,
    setAscending,
    multiThread,
    setMultiThread,
    partition,
    setPartition,
    setBars,
    setStats,
    swap,
  } = useSortContext();

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
    setStats({ comparisons: 0, swaps: 0, time: 0 });
  };

  const DISPLAY_WIDTH = 1000;
  const MAX_BAR_WIDTH = 100;

  const generateRandom = () => {
    setBars(
      Array.from({ length: arraySize }, () => getRandomInt(10, 200)).map(
        (height) => ({
          height,
          width: Math.min(DISPLAY_WIDTH / arraySize, MAX_BAR_WIDTH),
          status: "unsorted",
        })
      )
    );
  };

  const generateNearlySorted = () => {
    let heights = Array.from({ length: arraySize }, () =>
      getRandomInt(10, 200)
    ).sort((a, b) => a - b);
    for (let i = 0; i < Math.floor(arraySize / 10); i++) {
      heights = swap(
        heights,
        getRandomInt(0, arraySize),
        getRandomInt(0, arraySize)
      );
    }
    setBars(
      heights.map((height) => ({
        height,
        width: Math.min(DISPLAY_WIDTH / arraySize, MAX_BAR_WIDTH),
        status: "unsorted",
      }))
    );
  };

  useEffect(() => {
    generateRandom();
  }, [arraySize]);

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

  const options: optionType[] = [
  {
    text: ascending ? "Ascending" : "Descending",
    handleClick: () => setAscending(!ascending),
  },
  ...(sort === "merge" || sort === "quick"
    ? [{
        text: multiThread ? "Multi-Thread" : "Single Thread",
        handleClick: () => setMultiThread(!multiThread),
      }]
    : []),
  ...(sort === "quick"
    ? [{
        text: partition,
        handleClick: () =>
          setPartition(partition === "Lomuto" ? "Hoare" : "Lomuto"),
      }]
    : []),
  ];

  const generateOptions: optionType[] = [
    {
      text: "Random",
      handleClick: () => generateRandom(),
    },
    {
      text: "Nearly Sorted",
      handleClick: () => generateNearlySorted(),
    },
  ];

  return (
    <div className="dashboard">
      <h2 className="title">Sorting Visualizer</h2>
      <Dropdown text="Sorting Algorithms" options={sortOptions} />
      <Dropdown text="Options" options={options} />
      <button className="btn main-btn" onClick={handleSort}>
        {"Visualize " + capitalize(sort) + " Sort!"}
      </button>
      <Dropdown text="Generate" options={generateOptions} />
    </div>
  );
};

export default Dashboard;

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
import Slider from "./Slider";

const Dashboard: FC = () => {
  const {
    sort,
    setSort,
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
    barsOnTop,
    setBarsOnTop,
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
  };

  const DISPLAY_WIDTH = 2000;
  const MAX_BAR_WIDTH = 100;

  const createBars = (heights: number[]) => {
    setBars(
      heights.map((height) => ({
        height,
        width: Math.min(DISPLAY_WIDTH / arraySize, MAX_BAR_WIDTH),
        status: "unsorted",
      }))
    );
  };

  const generateRandom = () => {
    const heights = Array.from({ length: arraySize }, () =>
      getRandomInt(10, 500)
    );
    createBars(heights);
  };

  const generateNearlySorted = () => {
    let heights = Array.from({ length: arraySize }, () =>
      getRandomInt(10, 500)
    ).sort((a, b) => a - b);
    for (let i = 0; i < Math.floor(arraySize / 10); i++) {
      heights = swap(
        heights,
        getRandomInt(0, arraySize),
        getRandomInt(0, arraySize)
      );
    }
    createBars(heights);
  };

  const generateReverse = () => {
    const heights = Array.from({ length: arraySize }, () =>
      getRandomInt(10, 500)
    ).sort((a, b) => a - b);
    if (ascending) heights.reverse();
    createBars(heights);
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

  const algorithms: optionType[] = [
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

  const generateOptions: optionType[] = [
    {
      text: "Random",
      handleClick: () => generateRandom(),
    },
    {
      text: "Nearly Sorted",
      handleClick: () => generateNearlySorted(),
    },
    {
      text: "Reverse",
      handleClick: () => generateReverse(),
    },
  ];

  const sortOptions: optionType[] = [
    {
      text: ascending ? "Ascending" : "Descending",
      handleClick: () => setAscending(!ascending),
    },
    ...(sort === "merge" || sort === "quick"
      ? [
          {
            text: multiThread ? "Multi-Thread" : "Single Thread",
            handleClick: () => setMultiThread(!multiThread),
          },
        ]
      : []),
    ...(sort === "quick"
      ? [
          {
            text: partition,
            handleClick: () =>
              setPartition(partition === "Lomuto" ? "Hoare" : "Lomuto"),
          },
        ]
      : []),
  ];

  const settings: optionType[] = [
    {
      text: "Bars on " + (barsOnTop ? "Top" : "Bottom"),
      handleClick: () => setBarsOnTop(!barsOnTop),
    },
  ];

  return (
    <div className="dashboard">
      <h2 className="title">Sorting Visualizer</h2>
      <div className="board">
        <Slider
          text="Array Size"
          min={4}
          max={100}
          step={1}
          value={arraySize}
          setValue={setArraySize}
        />
        <Dropdown text="Algorithms" options={algorithms} />
        <Dropdown text="Generate" options={generateOptions} />
        <button className="btn main-btn" onClick={handleSort}>
          {"Visualize " + capitalize(sort) + " Sort!"}
        </button>
        <Dropdown text="Sort Options" options={sortOptions} />
        <Dropdown text="Settings" options={settings} />
        <Slider
          text="Sort Speed"
          min={1}
          max={100}
          step={1}
          value={sortSpeed}
          setValue={setSortSpeed}
        />
      </div>
    </div>
  );
};

export default Dashboard;

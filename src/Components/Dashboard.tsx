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
import Dropdown from "./Dropdown";

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
    startTimer,
  } = useSortContext();

  const selectionSort = useSelectionSort();
  const bubbleSort = useBubbleSort();
  const insertionSort = useInsertionSort();
  const heapSort = useHeapSort();
  const quickSort = useQuickSort();
  const mergeSort = useMergeSort();
  const bozoSort = useBozoSort();

  const handleSort = () => {
    startTimer();
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
    const heights = Array.from({ length: arraySize }, () => getRandomInt(10, 400));
    createBars(heights);
  };

  const generateNearlySorted = () => {
    let heights = Array.from({ length: arraySize }, () => getRandomInt(10, 400)).sort(
      (a, b) => a - b
    );
    if (!ascending) heights.reverse();
    for (let i = 0; i < Math.floor(arraySize / 10); i++) {
      heights = swap(heights, getRandomInt(0, arraySize), getRandomInt(0, arraySize));
    }
    createBars(heights);
  };

  const generateReverse = () => {
    const heights = Array.from({ length: arraySize }, () => getRandomInt(10, 400)).sort(
      (a, b) => a - b
    );
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
            handleClick: () => setPartition(partition === "Lomuto" ? "Hoare" : "Lomuto"),
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
    <div className="flex bg-slate-800 px-4 py-4 border-b-2 border-slate-700">
      <h2 className="absolute top-10 left-8 text-2xl font-bold text-white helvetica">
        Sorting Visualizer
      </h2>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <div className="flex gap-10">
          <div className="flex items-center gap-4">
            <p className="text-white font-bold">{"Array Size: "}</p>
            <input
              className="range range-sm range-primary w-40"
              type="range"
              onChange={(e) => setArraySize(Number(e.target.value))}
              min={4}
              max={100}
              step={1}
              value={arraySize}
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-white font-bold">{"Sort Speed: "}</p>
            <input
              className="range range-sm range-primary w-40"
              type="range"
              onChange={(e) => setSortSpeed(Number(e.target.value))}
              min={1}
              max={100}
              step={1}
              value={sortSpeed}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Dropdown text="Algorithms" options={algorithms} />
          <Dropdown text="Generate" options={generateOptions} />
          <button className="btn btn-primary" onClick={handleSort}>
            {"Visualize " + capitalize(sort) + " Sort!"}
          </button>
          <Dropdown text="Sort Options" options={sortOptions} />
          <Dropdown text="Settings" options={settings} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

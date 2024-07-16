/* eslint-disable react-refresh/only-export-components */
import { FC, ReactNode, createContext, useContext, useState } from "react";
import {
  BarProps,
  partitionType,
  SortContextType,
  sortType,
  StatsProps,
  StatusProps,
} from "./Props";
import { checkSorted, finalize, shift, swap, visualize } from "./SortUtils";
import useStopwatch from "./useStopwatch";

const SortContext = createContext<SortContextType | undefined>(undefined);

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};

export const SortProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [arraySize, setArraySize] = useState(10);
  const [barsOnTop, setBarsOnTop] = useState(true);
  const [sortSpeed, setSortSpeed] = useState(10);
  const [sort, setSort] = useState<sortType>("selection");

  const [ascending, setAscending] = useState(true);
  const [multiThread, setMultiThread] = useState(false);
  const [partition, setPartition] = useState<partitionType>("Lomuto");
  const [degree, setDegree] = useState(2);
  const [checkAnim, setCheckAnim] = useState(true);
  const [bars, setBars] = useState<BarProps[]>([]);
  const [stats, setStats] = useState<StatsProps>({
    comparisons: 0,
    swaps: 0,
  });
  const {
    elapsedTime,
    handleStart: startTimer,
    handlePause: pauseTimer,
    handleReset: resetTimer,
  } = useStopwatch();

  const heights = bars.map((bar) => bar.height);
  const interval = Math.min(100 / bars.length / sortSpeed, 1) * 250;

  const _visualize = (heights: number[], statusInfo: StatusProps) =>
    visualize(heights, statusInfo, bars, interval, setBars);
  const _checkSorted = (heights: number[], runAnim = checkAnim) =>
    checkSorted(heights, ascending, runAnim, _visualize);
  const _finalize = (heights: number[]) =>
    finalize(heights, pauseTimer, _checkSorted, _visualize);

  const appState = {
    arraySize,
    setArraySize,
    barsOnTop,
    setBarsOnTop,
    sortSpeed,
    setSortSpeed,
    sort,
    setSort,
  };

  const sortState = {
    ascending,
    setAscending,
    multiThread,
    setMultiThread,
    partition,
    setPartition,
    degree,
    setDegree,
    checkAnim,
    setCheckAnim,
    bars,
    setBars,
    stats,
    setStats,
    heights,
    interval,
  };

  const functions = {
    swap: swap,
    shift: shift,
    visualize: _visualize,
    checkSorted: _checkSorted,
    finalize: _finalize,
  };

  const stopwatch = {
    elapsedTime,
    startTimer,
    pauseTimer,
    resetTimer,
  };

  const context = {
    ...appState,
    ...sortState,
    ...functions,
    ...stopwatch,
  };

  return (
    <SortContext.Provider value={context}>{children}</SortContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
import { FC, ReactNode, createContext, useContext, useState } from "react";
import {
  BarProps,
  partitionType,
  SortContextType,
  StatsProps,
  StatusProps,
} from "./Props";
import { checkSorted, finalize, shift, swap, visualize } from "./SortUtils";

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
  const [sortSpeed, setSortSpeed] = useState(10);
  const [ascending, setAscending] = useState(true);
  const [multiThread, setMultiThread] = useState(false);
  const [partition, setPartition] = useState<partitionType>("Lomuto");
  const [degree, setDegree] = useState(2);
  const [checkAnim, setCheckAnim] = useState(true);
  const [bars, setBars] = useState<BarProps[]>([]);
  const [stats, setStats] = useState<StatsProps>({
    comparisons: 0,
    swaps: 0,
    time: 0,
  });

  const heights = bars.map((bar) => bar.height);
  const interval = Math.min(100 / bars.length / sortSpeed, 1) * 500;

  const state = {
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

  const _swap = (array: number[], i1: number, i2: number) =>
    swap(array, i1, i2, stats);
  const _shift = (array: number[], to: number, from: number) =>
    shift(array, to, from, stats);
  const _visualize = (heights: number[], statusInfo: StatusProps) =>
    visualize(heights, statusInfo, bars, interval, setBars);
  const _checkSorted = (heights: number[], runAnim = checkAnim) =>
    checkSorted(heights, ascending, runAnim, stats, _visualize);
  const _finalize = (heights: number[]) =>
    finalize(heights, _checkSorted, _visualize);

  const context = {
    ...state,
    swap: _swap,
    shift: _shift,
    visualize: _visualize,
    checkSorted: _checkSorted,
    finalize: _finalize,
  };

  return (
    <SortContext.Provider value={context}>{children}</SortContext.Provider>
  );
};

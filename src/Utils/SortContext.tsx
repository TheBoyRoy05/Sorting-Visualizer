/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, useContext, useState } from "react";
import { BarProps, partitionType, SortContextType, StatusProps } from "./Props";
import { checkSorted, finalize, visualize } from "./SortUtils";

const SortContext = createContext<SortContextType | undefined>(undefined);

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};

export const SortProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [arraySize, setArraySize] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(10);
  const [ascending, setAscending] = useState(true);
  const [multiThread, setMultiThread] = useState(false);
  const [partition, setPartition] = useState<partitionType>("Lomuto");
  const [degree, setDegree] = useState(2);
  const [checkAnim, setCheckAnim] = useState(true);
  const [bars, setBars] = useState<BarProps[]>([]);

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
    heights,
    interval,
  };

  const _visualize = (heights: number[], statusInfo: StatusProps) =>
    visualize(heights, statusInfo, bars, interval, setBars);
  const _checkSorted = (heights: number[], runAnim = checkAnim) =>
    checkSorted(heights, ascending, runAnim, _visualize);
  const _finalize = (heights: number[]) =>
    finalize(heights, _checkSorted, _visualize);

  const context = {
    ...state,
    visualize: _visualize,
    checkSorted: _checkSorted,
    finalize: _finalize,
  };

  return (
    <SortContext.Provider value={context}>{children}</SortContext.Provider>
  );
};

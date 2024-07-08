import React, { createContext, useContext, useState, useEffect } from "react";
import { BarProps, partitionType, SortContextType, StatusProps } from "./Props";

const SortContext = createContext<SortContextType | undefined>(undefined);

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const DISPLAY_WIDTH = 1000;
  const MAX_BAR_WIDTH = 100;

  const [arraySize, setArraySize] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(10);
  const [ascending, setAscending] = useState(true);
  const [multiThread, setMultiThread] = useState(false);
  const [partition, setPartition] = useState<partitionType>("Lomuto");
  const [degree, setDegree] = useState(2);
  const [bars, setBars] = useState<BarProps[]>([]);

  const interval = Math.min(100 / bars.length / sortSpeed, 1) * 500;

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const generate = (size: number) => {
    const newBars = Array.from({ length: size }, () =>
      getRandomInt(10, 200)
    ).map((height) => ({
      height,
      width: Math.min(DISPLAY_WIDTH / size, MAX_BAR_WIDTH),
      status: "unsorted" as const,
    }));
    setBars(newBars);
  };

  const swap = (array: number[], i1: number, i2: number) => {
    const newArray = [...array];
    [newArray[i1], newArray[i2]] = [newArray[i2], newArray[i1]];
    return newArray;
  };

  const shift = (array: number[], to: number, from: number) => {
    return [
      ...array.slice(0, to),
      array[from],
      ...array.slice(to, from),
      ...array.slice(from + 1),
    ];
  };

  const visualize = async (heights: number[], status: StatusProps) => {
    await new Promise<void>((resolve) => {
      const { targets, selected, sorting, sorted } = status;
      setTimeout(() => {
        setBars(
          heights.map((height, index) => ({
            width: bars[index].width,
            height: height,
            status:
              (typeof selected === "number" && index === selected) ||
              (typeof selected === "object" && selected.includes(index))
                ? "selected"
                : (typeof targets === "number" && index === targets) ||
                  (typeof targets === "object" && targets.includes(index))
                ? "targeted"
                : (typeof sorting === "number" && index < sorting) ||
                  (typeof sorting === "object" && sorting.includes(index))
                ? "sorting"
                : (typeof sorted === "number" && index < sorted) ||
                  (typeof sorted === "object" && sorted.includes(index))
                ? "sorted"
                : "unsorted",
          }))
        );
        resolve();
      }, interval);
    });
  };

  const finalize = async (heights: number[]) => {
    const sorted = heights
      .slice(1)
      .every((height, i) =>
        ascending ? height >= heights[i] : height <= heights[i]
      );

    await visualize(heights, { sorting: bars.length });
    if (sorted) {
      await visualize(heights, { sorted: bars.length });
    }
  };

  useEffect(() => {
    generate(arraySize);
  }, [arraySize]);

  return (
    <SortContext.Provider
      value={{
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
        bars,
        setBars,
        interval,
        generate,
        swap,
        shift,
        visualize,
        finalize,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};

import { BarProps } from "../Components/Display";

export interface SortProps {
  bars: BarProps[];
  setBars: (bars: BarProps[]) => void;
  interval: number;
  ascending: boolean;
}

export function swap(array: number[], i1: number, i2: number): number[] {
  const newArray = [...array];
  [newArray[i1], newArray[i2]] = [newArray[i2], newArray[i1]];
  return newArray;
}

export function shift(array: number[], to: number, from: number): number[] {
  return [
    ...array.slice(0, to),
    array[from],
    ...array.slice(to, from),
    ...array.slice(from + 1),
  ];
}

export function getBars(
  bars: BarProps[],
  heights: number[],
  targets: number[],
  sortingFrom: number
): BarProps[] {
  return heights.map((height, index) => ({
    width: bars[index].width,
    height: height,
    status: targets.includes(index)
      ? ("targeted" as const)
      : index < sortingFrom
      ? ("sorting" as const)
      : ("unsorted" as const),
  }));
}

export function setAllSorted(bars: BarProps[]): BarProps[] {
  return bars.map((bar) => ({
    ...bar,
    status: "sorted" as const,
  }));
}

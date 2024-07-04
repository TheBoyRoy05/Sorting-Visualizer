import { BarProps } from "../Components/Display";

export function swap(
  array: number[],
  index1: number,
  index2: number
): number[] {
  const newArray = [...array];
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
  return newArray;
}

export function getBars(
  bars: BarProps[],
  heights: number[],
  sortingCondition: number[],
  sortedCondition: number
): BarProps[] {
  return heights.map((height, index) => ({
    width: bars[index].width,
    height: height,
    status:
      sortingCondition.includes(index)
        ? ("sorting" as const)
        : index < sortedCondition
        ? ("sorted" as const)
        : ("unsorted" as const),
  }));
}

export function setAllSorted(bars: BarProps[]): BarProps[] {
  return bars.map((bar) => ({
    ...bar,
    status: "sorted" as const,
  }));
}

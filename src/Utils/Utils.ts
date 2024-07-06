import { BarProps, SortProps } from "./Props";

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
  targets?: number[],
  sortingFrom?: number,
  sorted?: number[],
  pivotIndex?: number
): BarProps[] {
  return heights.map((height, index) => ({
    width: bars[index].width,
    height: height,
    status:
      targets && targets.includes(index)
        ? "targeted"
        : index === pivotIndex
        ? "pivot"
        : sorted && sorted.includes(index)
        ? "sorted"
        : sortingFrom && index < sortingFrom
        ? "sorting"
        : "unsorted",
  }));
}


export async function visualize(callback: () => void, interval: number) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, interval);
  });
}

export async function finalize(props: SortProps, heights: number[]) {
  const { setBars, interval } = props;
  let { bars } = props;
  bars = getBars(bars, heights, [], bars.length);
  await visualize(() => setBars(bars), interval);
  setTimeout(() => setBars(setAllSorted(bars)), interval);
}

function setAllSorted(bars: BarProps[]): BarProps[] {
  return bars.map((bar) => ({
    ...bar,
    status: "sorted" as const,
  }));
}
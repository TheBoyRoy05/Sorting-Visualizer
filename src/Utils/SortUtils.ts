import { StatusProps, BarProps, StatsProps } from "./Props";

export const swap = (
  array: number[],
  i1: number,
  i2: number,
  stats: StatsProps
) => {
  stats.swaps++;
  const newArray = [...array];
  [newArray[i1], newArray[i2]] = [newArray[i2], newArray[i1]];
  return newArray;
};

export const shift = (
  array: number[],
  to: number,
  from: number,
  stats: StatsProps
) => {
  stats.swaps++;
  return [
    ...array.slice(0, to),
    array[from],
    ...array.slice(to, from),
    ...array.slice(from + 1),
  ];
};

export const checkSorted = async (
  heights: number[],
  ascending: boolean,
  checkAnim: boolean,
  stats: StatsProps,
  visualize: (heights: number[], statusInfo: StatusProps) => Promise<void>
) => {
  for (let i = 0; i < heights.length; i++) {
    if (checkAnim) {
      await visualize(heights, { selected: i, sorting: i });
    }
    stats.comparisons++;
    const wrongOrder = heights[i] < heights[i-1] == ascending;
    if (i != 0 && heights[i] != heights[i-1] && wrongOrder) {
      await visualize(heights, { targets: [i, i - 1], sorting: i });
      return false;
    }
  }
  return true;
};

const getBarStatus = (index: number, statusInfo: StatusProps) => {
  const { targets, selected, sorting, sorted } = statusInfo;
  return (typeof selected === "number" && index === selected) ||
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
    : "unsorted";
};

export const visualize = async (
  heights: number[],
  statusInfo: StatusProps,
  bars: BarProps[],
  interval: number,
  setBars: (bars: BarProps[]) => void
) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      setBars(
        heights.map((height, index) => ({
          width: bars[index].width,
          height: height,
          status: getBarStatus(index, statusInfo),
        }))
      );
      resolve();
    }, interval);
  });
};

export const finalize = async (
  heights: number[],
  checkSorted: (heights: number[]) => Promise<boolean>,
  visualize: (heights: number[], statusInfo: StatusProps) => Promise<void>
) => {
  await visualize(heights, { sorting: heights.length });
  if (await checkSorted(heights)) {
    await visualize(heights, { sorted: heights.length });
  }
};

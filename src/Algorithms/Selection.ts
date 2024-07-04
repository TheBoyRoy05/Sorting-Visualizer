import { BarProps } from "../Components/Display";
import { swap, getBars, setAllSorted } from "./Utils.ts";

export default async function SelectionSort(
  bars: BarProps[],
  setBars: (bars: BarProps[]) => void,
  timeInterval: number,
  ascending: boolean
) {
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    const next = ascending ? Math.min : Math.max;
    let nextHeight = heights[i];

    for (let j = i; j < heights.length; j++) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          nextHeight = next(nextHeight, heights[j]);
          bars = getBars(bars, heights, [heights.slice(i).indexOf(nextHeight) + i, j], i);
          setBars(bars);
          resolve();
        }, timeInterval)
      })
    }

    heights = swap(heights, i, heights.slice(i).indexOf(nextHeight) + i);
  }
  setBars(setAllSorted(bars));
}

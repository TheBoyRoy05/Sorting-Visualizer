import { BarProps } from "../Components/Display";
import { swap, getBars, setAllSorted } from "./Utils";

export default async function InsertionSort(
  bars: BarProps[],
  setBars: (bars: BarProps[]) => void,
  timeInterval: number,
  ascending: boolean
) {
  let heights = bars.map((bar) => bar.height);

  for (let i = 1; i < heights.length; i++) {
    let j = i;
    while (j > 0 && ascending === heights[j] < heights[j - 1]) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          bars = getBars(bars, heights, j, i + 1);
          setBars(bars);
          heights = swap(heights, j, j - 1);
          resolve();
        }, timeInterval);
      });

      j--;
    }
  }

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      bars = getBars(bars, heights, -1, heights.length - 1);
      setBars(bars);
      resolve();
    }, timeInterval);
  });

  setBars(setAllSorted(bars));
}
import { BarProps } from "../Components/Display";
import { swap, getBars, setAllSorted } from "./Utils.ts";

export default function SelectionSort(
  bars: BarProps[],
  setBars: (bars: BarProps[]) => void,
  timeInterval: number,
  ascending: boolean
) {
  let heights = bars.map((bar) => bar.height);

  for (let i = 0; i < heights.length; i++) {
    setTimeout(() => {
      const remaining = heights.slice(i);
      const next = ascending ? Math.min(...remaining) : Math.max(...remaining);
      const nextIndex = Number(remaining.indexOf(next));

      bars = getBars(bars, heights, nextIndex + i, i);
      setBars(bars);
      heights = swap(heights, i, nextIndex + i);
    }, i * timeInterval);
  }

  setTimeout(() => {
    setBars(setAllSorted(bars));
  }, bars.length * timeInterval);
}
